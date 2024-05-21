import { Component } from '@angular/core';
import {ApiBackendService} from "../../services/ApiBackendService/api.backend.service";
import {SweetAlertService} from "../../services/SweetAlertService/sweet.alert.service";
import {LocalStorageService} from "../../services/LocalStorageService/local.storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.css'
})
export class CartasComponent {
  cartas: any[] = [];
  expansionId: any;
  isChecked: boolean = false;

  constructor(private apiBackendService: ApiBackendService,
              private sweetAlertService: SweetAlertService,
              private localStorageService: LocalStorageService,
              private route:ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.expansionId = params['expansionId'];
      this.apiBackendService.obtenerCartasPorExpansion(this.expansionId).subscribe(
        (response) => {
          this.cartas = response;
          this.cartas.forEach((item, index) => {
            if (item.imagen != null) {
              let rutaImagen = '/opt/aplicaciones/pokemontcg/' + item.imagen.id +'.png';
              this.apiBackendService.obtenerImagenPorRuta(rutaImagen).subscribe(
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
            }
          });
        },
        (error) => {
          this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
        }
      );
    });
  }

  cambiarColor() {
    this.isChecked = !this.isChecked;
  }

  actualizarCartaVariedad(cartaVariedad: any) {
    this.apiBackendService.actualizarCartaVariedad(cartaVariedad).subscribe(
      (response) => {

      },
      (error) => {
        this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
      }
    );
  }


}
