const cep = document.getElementById("cep")
const email = document.getElementById("e-mail")
const nome = document.getElementById("nome")
const logradouro = document.getElementById("logradouro")
const numero = document.getElementById("numero")
const bairro = document.getElementById("bairro")
const localidade = document.getElementById("cidade")
const uf = document.getElementById("uf")
const cad = document.getElementById("cad")
const cartoes = document.getElementById("cartoes")
const busca = document.getElementById("busca")


const vetC = ["logradouro", "bairro", "localidade", "uf"]

let pes_salvo = JSON.parse(localStorage.getItem("cep_salvo"))
if(pes_salvo == null){
    pes_salvo = []
}


async function addCEP(dado, nome, cep, email){

    const novo = document.createElement("div")

    
    let div = document.createElement("div")
    div.innerText = nome
    novo.appendChild(div)

    div = document.createElement("div")
    div.innerText = "Email: " + email
    novo.appendChild(div)
    
    let s = "Local: "
    for (let index = 0; index < vetC.length; index++) {
        s += String(dado[vetC[index]])
        if(index + 1 < vetC.length){
            s += ", "
        }
    }

    div = document.createElement("div")
    div.innerText = s
    novo.appendChild(div)

    div = document.createElement("div")
    div.innerText = "CEP: " + cep
    novo.appendChild(div)

    cartoes.appendChild(novo)
}


async function save(){
    
    let dado = {logradouro: "", bairro: "", localidade: "", uf: ""}
    for (let index = 0; index < vetC.length; index++) {
        let com = "dado." + String(vetC[index]) + " = " +  String(vetC[index]) + ".value"
        eval(com)
    }
    console.log(dado)
    
    
    const obj = {nome: nome.value, cep: cep.value, email: email.value, dado:  JSON.stringify(dado)}
    pes_salvo.push(obj)
   

    localStorage.clear()
    localStorage.setItem("cep_salvo", JSON.stringify(pes_salvo))
    list("")
}

function list(s){
    while(cartoes.firstChild){
        cartoes.removeChild(cartoes.lastChild)
    }

  console.log(pes_salvo)
    for (let ind_cep = 0; ind_cep < pes_salvo.length; ind_cep++) {
        const a = pes_salvo[ind_cep].dado
        const data = JSON.parse(a)

        if(pes_salvo[ind_cep].nome.startsWith(s)){
            addCEP(data, pes_salvo[ind_cep].nome, pes_salvo[ind_cep].cep, pes_salvo[ind_cep].email)
        }
    }
}

async function getCEP(){
 return response = (await fetch("https://viacep.com.br/ws/" + cep.value + "/json/")).json();
}



cad.addEventListener("click" , save)

busca.addEventListener("input", () => list(busca.value))

cep.addEventListener("input", async () =>{
    const dado = await getCEP()
    for (let index = 0; index < vetC.length; index++) {
        let com = String(vetC[index]) + ".value = \"" + String(dado[vetC[index]]) + "\""
        eval(com)
    }

})