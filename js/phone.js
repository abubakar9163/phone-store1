const loadPhone= async(searchText,isShowAll)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();
    const phones=data.data;
    displayPhones(phones,isShowAll);

}

const displayPhones=(phones,isShowAll)=>{
    
    const phoneContainer=document.getElementById('phone-container');
    // clear phone container
    phoneContainer.textContent='';
    // display show all button
    const showAllContainer=document.getElementById('show-all-contaier');
    if (phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display first 12 phones
    // console.log('is show all',isShowAll);
  if(!isShowAll){
    phones= phones.slice(0,12);
  }
 


    
    phones.forEach(phone=>{
        // console.log(phone);
 
    const phoneCard=document.createElement('div');

    phoneCard.classList=`card bg-base-100 shadow-xl p-8`;

    phoneCard.innerHTML=`
                    <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button class="btn btn-primary" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
                      </div>
                    </div>
                  </div>
                
    `;
    phoneContainer.appendChild(phoneCard);



   })
   toggleLoadingSpinner(false);

}

const handleShowDetails=async(id)=>{
    console.log('clicked show details',id)
    const res=await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
   const phone=data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails=(phone)=>{
    console.log(phone);
 const phoneName=document.getElementById('show-details-phone-name');
 phoneName.innerText=phone.name;

 const showDetailsContainer=document.getElementById('show-details-container');
 showDetailsContainer.innerHTML=`
<img src="${phone.image}" alt="">
<p><span>"storage:"</span>${phone.mainFeatures?.storage}</p>
<p><span>"memory:"</span>${phone.mainFeatures?.memory}</p>
<p><span>"chipset:"</span>${phone.mainFeatures?.chipSet}</p>
 `
 
 


    show_details_modal.showModal()

}

function handleSearch(isShowAll){
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-filed');
    const searchText=searchField.value;
    
//    console.log(searchText)
   loadPhone(searchText,isShowAll);
  
}
// function handleSearch2(){
//     toggleLoadingSpinner(true);
//     const searchField=document.getElementById('search-filed2');
//     const searchText=searchField.value;
//    console.log(searchText)
//    loadPhone(searchText);
// }

const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll=()=>{
    handleSearch(true)

}

// loadPhone();