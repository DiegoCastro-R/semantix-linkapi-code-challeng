# semantix-linkapi-code-challeng

Requisitos do Code Challenge:

- Automação de Conversão ✅ 
- Automação de envio de arquivos ✅ 
- API ✅ 

⚙️ Requsitos para executar o projeto localmente:

- 🐳 Docker
- 🐳 Docker Compose

⚙️ Executando Projeto localmente:

  1- Clonar o repositorio:

  ` git clone https://github.com/DiegoCastro-R/semantix-linkapi-code-challeng.git `


  2- Executar a criação dos containers com docker-compose:
 
  ` cd semantinx-linkapi-code-challeng && docker-compose up -d`


🧭 Rotas da API:
  ex BaseURL:
  ` http://localhost:4000 `
  
  Folder:
   
  ` Create Folder - HTTP POST `
    
   ` PATH: baseURL/folder/create `
   <br />
   ` Body: { folderName: string } `
 
 File:
  
  
   ` Upload File - HTTP POST - MultiPart - FormData `
   
   ` PATH: baseURL/file/upload `
   <br />
   ` Body: {
          file: File,
          folderName: string
         } 
   `
   
  ` Upload File - HTTP DELETE `
   
   ` PATH: baseURL/file `
   <br />
   ` Body: {
          file: File,
          folderName: string
         } 
   `
 
 
    

