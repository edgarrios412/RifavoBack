const getFirstSaturday = (days) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
  
    // Calcular cuántos días faltan para el próximo sábado
    const daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSaturday);
  
    // Formatear la fecha a DD/MM/AA
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = String(currentDate.getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año
  
    return `${day}/${month}/${year}`;
}

function getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0, por eso se añade 1
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

module.exports = {
    getFirstSaturday,
    getYesterdayDate
}