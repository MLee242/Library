
let count = 0;
let myLibrary=[];
const container = document.querySelector("#container");
const buttons = document.querySelectorAll("button");
const inputs = document.getElementsByClassName('inputs');
const formt = document.getElementById('form-title');
const radios = document.getElementsByName('rating');
let editstatus = false;
let currelement = undefined;
let currbook = undefined;


//constructor:
function Book(title, author, numpages, hasread, rating){
    this.title= title;
    this.author = author;
    this.numpages = numpages;
    this.hasread = hasread;
    this.rating = rating;
}
Book.prototype.updateall = function(title, author, numpages, hasread, rating){
    this.title = title;
    this.author = author;
    this.numpages = numpages;
    this.hasread = hasread;
    this.rating = rating;
}

function on(){
   document.getElementById("addnewbook").style.display = "block";
}
function close(){
    document.getElementById("addnewbook").style.display = "none";
}
function capitalizeTitle(title){
    str = title.split(' ');
    let ans = "";
    for(let i = 0 ; i < str.length; i++){
        let x = "";
        let st = str[i];
        if(st == 'in' || st == 'at' || st == 'on' || st == 'a' || st =='an' || st =='and' || st == 'the' || st == 'or' || st == 'for' || st == 'of' || st == 'nor' || st == 'over'){
            x = st;
        }else{
            x = st.charAt(0).toUpperCase() + st.substr(1);
        }
        if(ans == ""){
            ans = x.charAt(0).toUpperCase() + x.substr(1);
        }else{
            ans += ' ' + x; 
        }
    }
    return ans;

    
}

function checkInputs(){
 
    if(inputs[0].value.trim() == ""){
        inputs[0].style.backgroundColor = "yellow";
        alert("Title cannot be empty");
        return true;
    }else if(inputs[1].value.trim() == ""){
        inputs[1].style.backgroundColor = "yellow";
        alert("Name of author cannot be empty");
        return true;
    }
    inputs[0].value = capitalizeTitle(inputs[0].value);
    inputs[1].value = capitalizeTitle(inputs[1].value);
    let isnum = /^\d+$/.test(inputs[2].value);
    if(!isnum){
        alert("Please Enter only numbers in number of page")
        inputs[2].style.backgroundColor = "yellow";
        return true;
    }
    return false;
}

function clearInput(){
    currelement = undefined;
    currbook = undefined;
    editstatus = false;
    for(let i = 0; i < inputs.length; i++){
        if(i < 3){
            inputs[i].value = '';
        }else{
            
            inputs[i].checked =false;
        }
    }
    for(let i = 0 ; i < radios.length; i++){
        radios[i].checked = false;
    }
}
function checkrating(){
    let max = 0;
    for(let i = 0 ; i < radios.length; i++){
        if(radios[i].checked){
            max = radios[i].value;
            break;
        }
    }
    return max;
}

function outputbuttonid(button){

    if(button.id == 1){
        on();
    }else if(button.id == 3){
        clearInput();
        close();
    }else if(button.id == 2){
        if(!checkInputs()){
            if(!editstatus){
                
                let bk = new Book(inputs[0].value, inputs[1].value, inputs[2].value,inputs[3].checked, checkrating());
                myLibrary.push(bk);
                addBookToLibrary(bk);
            }else{
                currbook.updateall(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked, checkrating());
                let temp = currelement.getElementsByClassName('title');
                temp[0].textContent = `${currbook.title}`;
                temp = currelement.getElementsByClassName('author');
                temp[0].textContent = `${currbook.author}`;
                temp = currelement.getElementsByClassName('book-pages');
                temp[0].textContent = `${currbook.numpages} pages`;
                temp = currelement.getElementsByClassName('lastrow')
                if(currbook.hasread){
                    temp[0].style.backgroundColor="#4E9CAF";
                    temp[1].style.backgroundColor = "#999";
                }else{
                    temp[1].style.backgroundColor="#4E9CAF";
                    temp[0].style.backgroundColor = "#999";
                }

                temp = currelement.getElementsByClassName('fa-star');
                for(let i = 0; i < 5; i++){
                    if(i < currbook.rating){
                        temp[i].classList.add('checked');
                        temp[i].classList.remove('unchecked');    
                    }else{
                        temp[i].classList.add('unchecked');
                        temp[i].classList.remove('checked');  
                    }
                }

            }
            
            close();
            clearInput();
        }
        
        
    }

}

let bk = new Book("How to influence and make friends","Dale Carnegie",100, false, 5);
let bk2 = new Book("Logical Reasoning 5th Edition","MANHATTAN Prep", 250, false,1);
addBookToLibrary(bk);
addBookToLibrary(bk2);
myLibrary.push(bk);
myLibrary.push(bk2);
function addBookToLibrary(bk){

    count = count + 1;
    let div = document.createElement('div');
    container.appendChild(div);
    div.className = "book";
   


    let t = document.createElement('p');
    t.className ='title';
    t.textContent = `${bk.title}`;

    let pages = document.createElement('p');
    pages.className = 'book-pages' ;
    pages.textContent = `${bk.numpages} pages`;


    let writer = document.createElement('p');
    writer.textContent = `by ${bk.author}`;
    writer.className ='author';

    let divrating = document.createElement('div');

    console.log(bk.rating);
    for(let i = 1; i <= 5; i++){
        
        let rating = document.createElement('span');
        if(i <= bk.rating){
            rating.className = "fa fa-star checked";
        }else{
            rating.className = "fa fa-star unchecked";
        }
        divrating.appendChild(rating);
    }
    

    let has_read = document.createElement('p');
    has_read.className = 'readstatus';
    has_read.className = 'lastrow';
    has_read.textContent = "I've read it";
    
    let hasnot_read = document.createElement('p');
    hasnot_read.className = 'lastrow';
    hasnot_read.textContent = "I want to read it";

    if(bk.hasread){
        has_read.style.backgroundColor="#4E9CAF";
    }else{
        hasnot_read.style.backgroundColor="#4E9CAF";
    }

    let edit = document.createElement('button');
    edit.textConent ="";
    edit.className = 'fa fa-edit btnpair edit-group';

    edit.addEventListener('click', function(){
        editstatus = true;
        formt.textContent = "Update Book"
        inputs[0].value = bk.title;
        inputs[1].value = bk.author;
        inputs[2].value = bk.numpages;
        inputs[3].checked = bk.hasread;
        
        radios[5-bk.rating].checked = true;


        on();
        currbook = bk;
        currelement = div;


    });

    let del = document.createElement('button');
    del.textContent = ""
    del.className = 'fa fa-close btnpair del-group'
    
    del.addEventListener('click', function(){
        console.log("hi");
        let r = confirm("Are you sure you want to delet this item?")
        if(r){
            container.removeChild(div);
            myLibrary.pop(bk);
            this.blur();
        }
        
    });

    div.appendChild(t);
    div.appendChild(pages);
    div.appendChild(writer);
    div.appendChild(divrating);
    div.appendChild(has_read);
    div.appendChild(hasnot_read);
    div.appendChild(del);
    div.appendChild(edit);


}

buttons.forEach(button =>{
    button.addEventListener('click', function(){

        outputbuttonid(button);
        this.blur();
    });

});
for(let i = 0 ; i < inputs.length; i++){
    inputs[i].addEventListener('focus', function(){
        inputs[i].style.backgroundColor = "white";
    })
}

clearInput();