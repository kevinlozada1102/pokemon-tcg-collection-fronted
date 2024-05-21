import { Component } from '@angular/core';
import {ApiBackendService} from "../../services/ApiBackendService/api.backend.service";
import {SweetAlertService} from "../../services/SweetAlertService/sweet.alert.service";
import {LocalStorageService} from "../../services/LocalStorageService/local.storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  series : any[] = [];

  constructor(private apiBackendService: ApiBackendService,
              private sweetAlertService: SweetAlertService,
              private localStorageService: LocalStorageService,
              private router: Router) {}

  ngOnInit() {
    this.apiBackendService.obtenerSeries().subscribe(
      (response) => {
        this.series = response;
        this.series.forEach((item, index) => {
          //let ruta item.logo.rutapath = 'C:/opt/aplicaciones/pokemontcg/' + item.logo.id +'.png';
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
        });
      },
      (error) => {
        this.sweetAlertService.showAlertError("Ocurrió un error al conectar al servidor");
      }
    );
  }

  onSerieClick(serie: any){
    this.router.navigate(['/serie', serie.id]);
  }

}
