export class session {
   
    constructor(  public isAuthenticated:boolean, public Name: string,public Email: string, public Roles: string[], public UserId: string 
      ) {
        
    }
}
