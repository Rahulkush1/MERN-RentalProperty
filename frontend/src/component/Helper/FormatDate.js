const FormatDate = ({dateString}) => {
    // Create a new Date object from the date string
    const date = new Date(dateString);
  
    // Define options for toLocaleDateString
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  
    // Format the date
    return date.toLocaleDateString('en-GB', options);
  };
  
export default FormatDate