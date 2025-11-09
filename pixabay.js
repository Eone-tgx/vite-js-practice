import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                     */import{a,S as i,i as r}from"./assets/vendor-BDL6tYN5.js";const n=a.create({baseURL:"https://pixabay.com/api/",params:{key:"48830775-40ff68ea61f2bc47ba43ee541",image_type:"photo",orientation:"horizontal",safesearch:!0}});function l(o){return n.get("",{params:{q:o}}).then(e=>e.data.hits).catch(e=>{throw e})}const c=new i(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",overlayOpacity:.8,showCounter:!1}),s={galleryList:document.querySelector(".gallery"),loader:document.querySelector("#loader")};function m(o){const e=o.map(t=>`<a href="${t.largeImageURL}" class="gallery-item">
        <img src="${t.webformatURL}" alt="${t.tags}" />
        <div class="image-info">
          <p><strong>Likes:</strong> ${t.likes}</p>
          <p><strong>Views:</strong> ${t.views}</p>
          <p><strong>Comments:</strong> ${t.comments}</p>
          <p><strong>Downloads:</strong> ${t.downloads}</p>
        </div>
      </a>`).join("");s.galleryList.innerHTML=e,c.refresh()}function g(){s.galleryList.innerHTML=""}function p(){s.loader.classList.remove("hidden")}function u(){s.loader.classList.add("hidden")}const h={form:document.querySelector(".pixabay-form")};h.form.addEventListener("submit",o=>{o.preventDefault(),g();const e=o.target.elements["search-text"].value.trim();if(!e){r.warning({title:"Alert",message:"Enter text",position:"topRight",timeout:3e3});return}p(),l(e).then(t=>{if(u(),t.length===0){r.error({title:"Sorry",message:"Nothing was found",position:"topRight",timeout:3e3});return}r.success({title:"Success",message:`Successfully searched images of ${e}`,position:"topRight",timeout:3e3}),m(t)}).catch(t=>{r.error({title:"Error",message:t.message,position:"topRight",timeout:3e3})}),o.target.reset()});
//# sourceMappingURL=pixabay.js.map
