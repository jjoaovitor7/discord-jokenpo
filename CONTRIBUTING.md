# Contribuindo para o discord-jokenpo

Grato pelo interesse em contribuir com o **discord-jokenpo**.
<br /><br />

## Primeiros passos
Antes de iniciar uma contribuição:
- Ler o `README.md` do projeto
- Verificar se já existe uma *issue* ou *pull request* relacionada
- Realizar o *fork* do repositório
<br />

## Abertura de Issues
Issues podem ser utilizadas para:
- Relato de bugs
- Sugestões de melhorias
- Dúvidas sobre o projeto

Sempre que possível, incluir:
- Descrição clara
- Passos para reproduzir (no caso de bugs)
- Comportamento esperado
<br /><br />

## Envio de alterações (Pull Request)
Alterações no código geralmente seguem este fluxo:
1. Criar uma branch para a mudança  
   ```bash
   git checkout -b type/description
   ```

   Exemplos de `type`:
   - `feat` → nova funcionalidade
   - `fix` → correção
   - `docs` → documentação
   - `refactor` → refatoração
   - `test` → testes

2. Implementação das alterações necessárias

3. Registro das alterações  
   ```bash
   git commit -m "type: description"
   ```

4. Envio a branch para o seu repositório remoto  
   ```bash
   git push origin type/description
   ```

5. Abertura do **Pull Request** para o repositório principal  
