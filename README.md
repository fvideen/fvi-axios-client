## FVI - Axios Client

Esta biblioteca é resposável por realizar chamadas _HTTP_ à um servidor de maneira fácil e rápida utilizando a lib [axiosjs](https://github.com/axios/axios).

### Configuração

Para configurarmos esta biblioteca devemos passar como parâmetro um _Object_ contendo as informações abaixo:

```javascript
{
    url: 'http://google.com',
    timeout: 1000,
    delay: 10
    headers: {
        'Content Type': 'text/html' 
    }
}
```

### Modo de Usar

```javascript

const client = app({
    url: 'http://localhost:80',
    timeout: 30000,
})

client
    .get('/support/ping')
    .then(res => res.data)
    .then(console.log)
    .catch(done)

client
    .post('/support/ping')
    .then(res => res.data)
    .then(console.log)
    .catch(done)

client
    .put('/support/ping')
    .then(res => res.data)
    .then(console.log)
    .catch(done)

client
    .delete('/support/ping')
    .then(res => res.data)
    .then(console.log)
    .catch(done)
```

# fvi-axios-client

-   `npm run compile`: Executa a limpeza dos arquivos e diretorios.
-   `npm run debug-test`: Executa os testes unitários com o DEBUG ativo.
-   `npm run test`: Executa os testes unitários.
-   `npm run debug-dev`: Executa os testes unitários e espera por alterações com o DEBUG ativo.
-   `npm run dev`: Executa os testes unitários e espera por alterçãoes.
-   `npm run prod`: Executa o código com NODE_ENV=production.
-   `npm run coverage`: Executa os testes unitários e retorna a cobertura dos códigos através do [nyc](https://github.com/istanbuljs/nyc/)
-   `npm run release`: Inicia uma nova release de versão incrementando o **patch**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:minor`: Inicia uma nova release de versão incrementando o **minor**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:major`: Inicia uma nova release de versão incrementando o **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finaliza a release, ou seja, realiza o [git flow](https://github.com/nvie/gitflow/) release finish.
