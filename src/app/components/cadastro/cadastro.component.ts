import { Usuario } from './../../models/usuario';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  public httpClient: HttpClient;
  public baseUrl: string;
  public usuario: Usuario = new Usuario();
  public message: string = "";
  public showMessage: boolean = false;

  displayBasic: boolean;

  name = new FormControl();
  email = new FormControl();
  phone = new FormControl();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required]
  });

  //@Inject('BASE_URL') baseUrl: string
  constructor(httpClient: HttpClient, private formBuilder: FormBuilder,){
    this.httpClient = httpClient;
    this.baseUrl = "http://localhost:8080/api/";
  }

  gravar(): void {

    this.httpClient.post(`${this.baseUrl}user/insert`, this.usuario)
    .subscribe(
      (val) => {
        if(val){
          this.apresentarMensagem("Dados gravados com sucesso.");
          this.limparTela(true);
          //this.listar();
        }
      },
      response => {
        if (response.error.text == "Dados gravados com sucesso."){
          this.apresentarMensagem("Dados gravados com sucesso.");
          this.limparTela(true);
          //this.listar();
        }
        else
          this.apresentarMensagem(response.error.text);
      },
      () => {
        //Não Apagar
      });

      this.form.reset();
  }

  apresentarMensagem(mensage: any) {
    this.message = mensage;
    this.showMessage = this.message != null ? true : false;
  }

  limparTela(all: boolean){
    this.usuario.name = "";
    this.usuario.email = "";
    this.usuario.phone = "";
  }

  showPopupMensagem(show: any) {
    this.showMessage = show;
    return false;
  }
}
