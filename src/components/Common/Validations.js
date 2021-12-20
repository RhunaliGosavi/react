export let onlyNumberKey=(evt)=> {
         
    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.nativeEvent.which) ? evt.nativeEvent.which : evt.nativeEvent.keyCode
  //  console.log("asc code",ASCIICode)
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        
        evt.preventDefault();
    }
       
    return true;
}