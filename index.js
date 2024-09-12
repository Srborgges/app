const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar água todo dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite sua meta:"})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar a meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluida(s)')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return true
    })

    if(realizadas.lenght ==0){
        console.log('Não existe metas realizadas! :(')
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {

    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [...
                {
                    neme: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Metas realizadas",
                    value: "Realizadas"
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
                console.log(metas)
                break
            case "Listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "Sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()

