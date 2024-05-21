import { Component } from '@angular/core';
import {ApiBackendService} from "../../services/ApiBackendService/api.backend.service";
import {SweetAlertService} from "../../services/SweetAlertService/sweet.alert.service";
import {LocalStorageService} from "../../services/LocalStorageService/local.storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.css'
})
export class ExpansionComponent {
  expansiones: any[] = [];
  serieId: any;

  constructor(private apiBackendService: ApiBackendService,
              private sweetAlertService: SweetAlertService,
              private localStorageService: LocalStorageService,
              private route:ActivatedRoute,
              private router: Router) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serieId = params['serieId'];
      this.apiBackendService.obtenerExpansionPorSerie(this.serieId).subscribe(
        (response) => {
          this.expansiones = response;
          this.expansiones.forEach((item, index) => {
            //let ruta item.logo.rutapath = 'C:/opt/aplicaciones/pokemontcg/' + item.logo.id +'.png';
            let rutaImagen = '/opt/aplicaciones/pokemontcg/' + item.logo.id +'.png';
            this.apiBackendService.obtenerImagenPorRuta(rutaImagen).subscribe(
              (response: Blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  item.logo.rutapath = reader.result as string;
                };
                reader.readAsDataURL(response);
              },
              (error) => {
                this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
              }
            );
          });
          this.expansiones.forEach((item, index) => {
            //let ruta item.logo.rutapath = 'C:/opt/aplicaciones/pokemontcg/' + item.logo.id +'.png';
            let simboloImagen = '/opt/aplicaciones/pokemontcg/' + item.imagen.id +'.png';
            this.apiBackendService.obtenerImagenPorRuta(simboloImagen).subscribe(
              (response: Blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  item.imagen.rutapath = reader.result as string;
                };
                reader.readAsDataURL(response);
              },
              (error) => {
                this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
              }
            );
          });
        },
        (error) => {
          this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
        }
      );
    });
  }

  onExpansionClick(expansion: any) {
    this.router.navigate(['/expansion', expansion.id]);
  }

}
