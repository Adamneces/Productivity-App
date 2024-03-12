export function formatDate(apiDateString) {
    const apiDate = new Date(apiDateString);
  
    // Extract components
    const year = apiDate.getFullYear();
    const month = (apiDate.getMonth() + 1).toString().padStart(2, '0');
    const day = apiDate.getDate().toString().padStart(2, '0');
    const hours = apiDate.getHours().toString().padStart(2, '0');
    const minutes = apiDate.getMinutes().toString().padStart(2, '0');
    const seconds = apiDate.getSeconds().toString().padStart(2, '0');
  
    // Formatted date string
    const formattedDate = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  
    return formattedDate;
  }