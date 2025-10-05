const { spawn } = require('child_process');
const path = require('path');

class PythonService {
    constructor() {
        this.pythonScript = path.join(__dirname, '../python/vegetation.py');
    }

    executePython(scriptData) {
        return new Promise((resolve, reject) => {
            console.log(' Ejecutando script Python para:', scriptData.state);
            
            const pythonProcess = spawn('python', [this.pythonScript], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let result = '';
            let errorOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                // Los mensajes de error van a stderr, no los mezcles con stdout
                errorOutput += data.toString();
                console.error('Python stderr:', data.toString());
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    // Limpiar el resultado - quitar espacios en blanco
                    const cleanResult = result.trim();
                    
                    // Encontrar el JSON en la salida (por si hay logs)
                    const jsonMatch = cleanResult.match(/\{.*\}/s);
                    const finalResult = jsonMatch ? jsonMatch[0] : cleanResult;
                    
                    try {
                        const parsedResult = JSON.parse(finalResult);
                        resolve(parsedResult);
                    } catch (parseError) {
                        console.error('❌ Error parseando JSON:', parseError.message);
                        console.error('📄 Output recibido:', cleanResult);
                        reject(new Error(`Error parseando JSON de Python: ${parseError.message}`));
                    }
                } else {
                    console.error('❌ Proceso Python falló:', errorOutput);
                    reject(new Error(`Proceso Python falló con código ${code}: ${errorOutput}`));
                }
            });

            pythonProcess.on('error', (error) => {
                console.error('❌ Error ejecutando Python:', error);
                reject(new Error(`No se pudo ejecutar Python: ${error.message}`));
            });

            // Enviar datos al proceso Python
            pythonProcess.stdin.write(JSON.stringify(scriptData));
            pythonProcess.stdin.end();
        });
    }

    async getVegetationData(state, startDate, endDate) {
        try {
            const result = await this.executePython({
                state: state,
                startDate: startDate,
                endDate: endDate
            });
            return result;
        } catch (error) {
            console.error('❌ Error en PythonService:', error);
            throw error;
        }
    }
}

module.exports = new PythonService();