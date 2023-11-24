import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  userVideos: any[] = [];


  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  redirectToLink(link: string) {
    window.location.href = link; // Redirige a la URL proporcionada
  }

    // Método para obtener los videos del usuario actual
// Modifica tu método en Tab3Page para manejar la promesa en lugar de suscribirse
getVideosByUserId(userId: string) {
  this.firebaseSvc.getVideosByUserId(userId).then((videos: any[]) => {
    console.log('Videos del usuario:', videos);
    this.userVideos = videos; // Almacena los videos en la variable userVideos
  }).catch(error => {
    console.error('Error al obtener los videos:', error);
  });
}
verVideo(video: any) {
  console.log('Ver video:', video);
  if (video.url) {
    window.open(video.url, '_blank'); // Abre la URL del video en una nueva pestaña
  } else {
    console.log('No se encontró la URL del video');
  }
}
// Dentro de Tab3Page
async getVideosForUser(userId: string) {
  try {
    const userVideos = await this.firebaseSvc.getVideosByUserId(userId);
    console.log('Videos del usuario con ID', userId, ':', userVideos);
    // Asigna userVideos a una variable para mostrarlos en la interfaz
    // this.userVideos = userVideos;
    // Lógica para mostrar los videos en la interfaz de Tab3Page
  } catch (error) {
    console.error('Error al obtener los videos del usuario con ID', userId, ':', error);
  }
}


      // Llama a getVideosByUserId al cargar la página para obtener los videos del usuario actual
      ionViewWillEnter() {
        const userData: any = this.user();
        if (userData && userData.userId) {
          this.firebaseSvc.getVideosByUserId(userData.userId).then((videos: any[]) => {
            console.log('Videos del usuario:', videos);
            this.userVideos = videos; // Almacena los videos en la variable userVideos
          }).catch(error => {
            console.error('Error al obtener los videos:', error);
          });
        }
      }

  redirectToFacebook() {
    const userData: any = this.user(); // Suponiendo que el enlace de Facebook está en userData.facebook
    if (userData && userData.facebook) {
      this.redirectToLink(userData.facebook);
    } else {
      console.log('No se encontró el enlace de Facebook');
    }
  }

  redirectToInstagram() {
    const userData: any = this.user(); // Suponiendo que el enlace de Instagram está en userData.instagram
    if (userData && userData.instagram) {
      this.redirectToLink(userData.instagram);
    } else {
      console.log('No se encontró el enlace de Instagram');
    }
  }

  redirectToTwitter(){
    const userData: any = this.user(); // Suponiendo que el enlace de Instagram está en userData.instagram
    if (userData && userData.twitter) {
      this.redirectToLink(userData.twitter);
    } else {
      console.log('No se encontró el enlace de Instagram');
    }
  }
  // Agrega métodos similares para otros enlaces...

  signOut() {
    this.firebaseSvc.signOut().then(() => {
      this.utilsSvc.router.navigate(['/login']);
      console.log('Se cerró la sesión correctamente');
    }).catch(error => {
      console.log('Error al cerrar sesión:', error);
    });
  }
}
