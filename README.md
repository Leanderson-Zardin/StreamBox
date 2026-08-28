# StreamBox

Base inicial do frontend do projeto educacional StreamBox, criada com HTML, JavaScript Vanilla e Tailwind CSS.

## Estrutura

```text
.
├── index.html              # Página inicial
├── src/
│   ├── assets/             # Imagens, ícones e outros recursos estáticos
│   ├── js/
│   │   └── main.js         # Ponto de entrada dos scripts JavaScript
│   └── styles/
│       ├── input.css       # Diretivas do Tailwind
│       └── output.css      # CSS gerado (após o build)
├── tailwind.config.js      # Configuração do Tailwind
└── package.json            # Comandos e dependências de desenvolvimento
```

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Gere o CSS do Tailwind durante o desenvolvimento:

   ```bash
   npm run watch:css
   ```

3. Abra o arquivo `index.html` no navegador.

Para gerar uma versão minificada do CSS, use `npm run build:css`.

## Próximas etapas

Esta base ainda não contém integrações com APIs nem funcionalidades de aplicação.
