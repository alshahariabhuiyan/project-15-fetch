const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => processData(data.data.tools))
        .catch(err => console.log(err))
}

const processData = (datas) => {
    const cardGroup = document.getElementById('card-group');
   console.log(datas[0].published_in)
    datas.forEach(data => {
        const dataId = data.id;
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
    <img class="img-fluid rounded" src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <p class="card-text">1.Natural language processing <br>
      2.Contextual understanding <br>
      3.Text generation</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
    <div >
      <h5 >${data.name}</h5>
      <div class="text-body-secondary" style="font-size:0.9rem ;font-weight:500"><img id="calender" src="./icon/calendar-days-solid.svg" alt=""> ${data.published_in}</div>
      </div>  
      <div id="btn" class="d-flex align-items-center" onclick="viewDetails(${dataId})"  data-bs-toggle="modal" data-bs-target="#exampleModal">
      <img id="icon" src="./icon/arrow-right-solid.svg" alt="" srcset="" style="cursor:pointer">
    </div>
    </div>
  </div>
    `
        cardGroup.appendChild(div)
        
     

    })
   
}
loadData()

const viewDetails = (id) => {
   
    fetch(`https://openapi.programming-hero.com/api/ai/tool/0${id}`)
    .then(res => res.json())
    .then(data => modalBody(data.data))
    .catch(err => console.log(err))
    
}
    
const modalBody = (datas) => {
    
    const modalImg =  document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    modalText.innerHTML = `
    <div>
        <h5>${datas.description}</h5>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:30px">
        <div style="width:50%">
            <h5>Features</h5>
            <ul style="font-size:0.8rem">
                <li>${datas.features[1].feature_name}</li>
                <li>${datas.features[2].feature_name}</li>
                <li>${datas.features[3].feature_name}</li>
                
            </ul>
        </div>
        <div style="width:50%">
            <h5>Integrations</h5>
            <ul style="font-size:0.8rem">
            <li>${datas.integrations[0]}</li>
            <li>${datas.integrations[1]} </li>
            <li>${datas.integrations[2]} </li>
            </ul>
        </div>
    </div>
    `
    modalImg.innerHTML = `
    <img class="img-fluid" src="${datas.image_link[0]}"> 
    <div style=" margin-top:20px">
        <h5 style="text-align:center">${datas.input_output_examples[0].input}</h5>
        <p style="text-align:center;font-size:0.9rem">${datas.input_output_examples[0].output}</p>
    </div>
    `
}
document.getElementById('showAll-btn').addEventListener('click', function(){
    
    const cardGroup = document.getElementById('card-group');
    cardGroup.classList.remove('overflow')
})
    
    



