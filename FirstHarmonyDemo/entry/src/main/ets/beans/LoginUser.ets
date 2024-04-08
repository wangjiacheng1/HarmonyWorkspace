export default class LoginUser{

  private username:string;

  private password:string;
  
  private isRememberPwd:boolean = false;

  constructor(username:string, password:string, isRemember:boolean){
    this.username = username;
    this.password = password;
    this.isRememberPwd = isRemember;
  }

  setUsername(username: string){
    this.username = username;
  }

  getUsername():string{
    return this.username;
  }

  setPassword(password:string){
    this.password = password;
  }

  getPassword():string{
    return this.password;
  }
}