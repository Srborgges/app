const { select, input } = require('@inquirer/prompts')

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite sua meta"})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }
}

const start = async () => {

    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    neme: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        })
    

        switch(opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                break
            case "Listar":
                console.log("Vamos listar")
                break
            case "Sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()

