document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    .then(data => displayDogs(data))
    
    function displayDogs(data){
        for (let i = 0; data.length > i; i++){
            const createTr = document.createElement('tr');
            
            createTr.innerHTML = `
            <td>${data[i].name}</td>
            <td>${data[i].breed}</td>
            <td>${data[i].sex}</td>
            <button id='edit-dog-button'>Edit</button>
            `
            document.getElementById('table-body').appendChild(createTr);
        }
    }
})