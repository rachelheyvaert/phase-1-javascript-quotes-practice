onst quotesUL = document.getElementById("quote-list")
let newQuotesForm = document.getElementById('new-quote-form')

fetch("http://localhost:3000/quotes?_embed=likes")
  .then(r => r.json())
  .then((responseObj) => {
    responseObj.forEach((quote) => {
      takeOneJSONToLI(quote)
    })
  })

// {} -> <li data-id="2"></li>
function takeOneJSONToLI(quote) {
  quotesUL.innerHTML += `
  <li id="quote-${quote.id}" class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button data-id="${quote.id}" class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
      <button data-id="${quote.id}" class='btn-danger'>Delete</button>
    </blockquote>
  </li>
  `


  // // ANOTHER POTENTIAL WAY

  // let newLi = document.createElement("li")
  // newLi.id = `quote-${quote.id}`
  // newLi.className = 'quote-card'
  //
  // newLi.innerHTML += `
  //   <blockquote class="blockquote">
  //     <p class="mb-0">${quote.quote}</p>
  //     <footer class="blockquote-footer">${quote.author}</footer>
  //     <br>
  //     <button data-id="${quote.id}" class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
  //     <button data-id="${quote.id}" class='btn-danger'>Delete</button>
  //   </blockquote>
  // `
  //
  // quotesUL.append(newLi)
  //
  // let likeBtn = newLi.querySelector(".btn-success")
  // likeBtn.addEventListener("click", (evt) => {
    // // Blah blah blah
  // })
  // let deleteBtn = newLi.querySelector(".btn-danger")

}

quotesUL.addEventListener("click", (evt) => {
  if (evt.target.className === "btn-danger") {
    // DELETE
    let id = evt.target.dataset.id
    // evt.target["dataset"].id
    // evt.target.getAttribute("data-id")

    // Manipulation of the DOM happens out the then is Optimistic
    let li = document.querySelector(`#quote-${id}`)
    li.remove()

    fetch(`http://localhost:3000/quotes/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      // Manipulation of the DOM happens in the then is Pessimistic

      // evt.target.parentElement.parentElement.remove()

      // let li = document.querySelector(`#quote-${id}`)
      // li.remove()
    })



  }
  if (evt.target.className === "btn-success") {
    // Like
    let id = evt.target.dataset.id

    fetch(`http://localhost:3000/likes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quoteId: parseInt(id)
      })
    })
    .then(res => res.json())
    .then((response) => {
      let spanTag = evt.target.querySelector("span")
      let newLike = parseInt(spanTag.innerText) + 1
      spanTag.innerText = newLike
    })





  }
  if (evt.target.tagName === "SPAN") {
    let id = evt.target.parentElement.dataset.id
  }
})

newQuotesForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  let newQuote = evt.target["new-quote"].value
  let newAuthor = evt.target["author"].value

  fetch(`http://localhost:3000/quotes`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      author: newAuthor,
      quote: newQuote
    })
  })
  .then(res => res.json())
  .then((quoteObj) => {

    quoteObj.likes = []
    takeOneJSONToLI(quoteObj)
  })


})


// const fetchURL = 'http://localhost:3000/quotes?_embed=likes'
// const quoteContainer = document.getElementById('quote-list')
// let count
// document.addEventListener('DOMContentLoaded', () => {
//     handleFetch()
// })

// function handleFetch() {
//     fetch(fetchURL).then(response => response.json())
//     .then(quoteData => {
//         console.log(quoteData)
//         quoteData.forEach(quote => {
//             createQuoteCard(quote)}
//             )}
//         )}

// function createQuoteCard(quote){
// const quoteCard = document.createElement('ul')
// const blockQuote = document.createElement('blockquote')
// blockQuote.className = 'blockquote'
// const actualQuote = document.createElement('p')
// actualQuote.className = "mb-0"
// actualQuote.textContent = quote.quote
// const author = document.createElement('p')
// author.className = "blockquote"
// author.textContent= quote.author
// const brk = document.createElement('break')
// const likeBtn = document.createElement('button')
// let count = 0
// likeBtn.innerHTML = `Likes: <span>${count}</span>`
// likeBtn.className ='btn-success'
// const span = document.createAttribute('span')
// span.textContent = quote.likes.quoteID
// const deleteBtn = document.createElement('button')
// deleteBtn.textContent= 'Delete'
// deleteBtn.className = 'btn-danger'
// quoteCard.append(blockQuote, actualQuote, author, brk, likeBtn,deleteBtn);
// quoteContainer.append(quoteCard)
//     }
// //submit event
// const form = document.getElementsByClassName('new-quote-form')
// form.addEventListener('submit', (e)=> {
// e.preventDefault();
// const newQuoteForm = document.getElementById('new-quote')
// newQuoteForm.textContent = input.value
// const newAuthor = document.getElementById('author')
// newAuthor.textContent = input.value
// createQuoteCard(newQuoteForm, newAuthor)
// //new quote becomes actual quote content, author becomes author footer for create QuoteCard
// //need to append to the DOM

// })
// //like button event
// // const likeButton = document.getElementsByClassName('btn-success')
// // likeButton.addEventListener('click', () => {
// // post request

// // })

// // //delete button event
// // deleteBtn.addEventListener('click', ()=> {

// // }))
