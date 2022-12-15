export const  handleChange=(e,settarget)=> {
    let amount = parseFloat(e.target.value);
    console.log(typeof(amount),e.target.value);
    if (isNaN(amount) || amount < 0 || e.target.value[0] === '0') {
        amount = '';
    }
    settarget(amount)
}