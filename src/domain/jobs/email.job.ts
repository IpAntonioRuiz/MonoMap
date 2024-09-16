import cron from 'node-cron';
import { MonoModel } from '../../data/models/mono.model';
import { EmailService } from '../services/email.service';
import { MonoDataSource } from '../datasources/mono.datasource';
import { generateMonoCaseEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    cron.schedule('*/10 * * * * *', async () => {
        const emailService = new EmailService();
        const monoDataSource = new MonoDataSource();
        try {
            const cases = await MonoModel.find({ isSent: false });
            if (!cases.length) {
                console.log("No hay más casos pendientes de enviar.");
                return;
            }

            console.log(`Procesando ${cases.length} casos.`);

            await Promise.all(
                cases.map(async (monoCase) => {
                    const htmlBody = generateMonoCaseEmailTemplate(
                        monoCase.lat,
                        monoCase.lng,
                        monoCase.genre,
                        monoCase.age
                    );
                    await emailService.sendEmail({
                        to: "ipchocogames452@gmail.com",
                        subject: `Nuevo caso de viruela del mono`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el caso con ID: ${monoCase._id}`);
                    await monoDataSource.updateMonoCase(monoCase._id.toString(), { ...monoCase, isSent: true });
                    console.log(`Caso actualizado para el ID: ${monoCase._id}`);
                })
            );
        } catch (error) {
            console.log("Error durante el trabajo de envío de correos.");
        }
    });
};