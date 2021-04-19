document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    .then(data => {
        displayDogs(data);
        addListenerToEdit(data);
    })
    
    function displayDogs(data){
        for (let i = 0; data.length > i; i++){
            const createTr = document.createElement('tr');
            
            createTr.innerHTML = `
            <td>${data[i].name}</td>
            <td>${data[i].breed}</td>
            <td>${data[i].sex}</td>
            <button class='edit-dog-button'>Edit</button>
            `
            document.getElementById('table-body').appendChild(createTr);
        }
    }
    function addListenerToEdit(data){
        const editButtonArray = Array.from(document.getElementsByClassName('edit-dog-button'));

        for (let i = 0; editButtonArray.length > i; i++) {
            editButtonArray[i].addEventListener('click', (e) => {
                e.preventDefault();

                let dogNameInput = document.getElementById('inputName');
                let dogBreedInput = document.getElementById('inputBreed');
                let dogSexInput = document.getElementById('inputSex');

                dogNameInput.value = data[i].name;
                dogBreedInput.value = data[i].breed;
                dogSexInput.value = data[i].sex;

                const submitEditButton = document.getElementById('submitButton');
                submitEditButton.addEventListener('click', (e) => {
                    e.preventDefault();
            
                    fetch(`http://localhost:3000/dogs/${data[i].id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: dogNameInput.value,
                            breed: dogBreedInput.value,
                            sex: dogSexInput.value,
            
                        })
                    })
                }) 

            })
        }
    }

})