export interface student{
    id? :number,
    fullname :string,
    email:string,
    password:string,

}
export interface LoginRequest{
    email:string;
    password:string;
}
