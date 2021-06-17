export default interface HashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}

//metodos
//para gerar a senha criptografada = generateHash()
//para comparar a senha passada com a criptografada= compareHash()
