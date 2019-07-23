import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authLogin } from '../store/actions';

export class News extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <div className="ok">
                <hr className="my-5"/>

<h2>Challenge Robotique</h2>
<p>ASJAY TEAM — July 04th, 2019</p>

<hr className="my-5"/>

{/* <div class="item card" style={{width: '25rem', height: '27rem'}}> */}
<h5>PRESENTATION: </h5>
<p>Le challenge robotique du lycée Langevin concerne les élèves de 1SIN, de 1ITEC et de 1SSI. Les objectifs sont de :</p>
<p>1. Sensibiliser les élèves à la gestion d’un projet</p>
<p>2. Faire travailler plusieurs classes sur le même projet</p>
<p>3. Mettre en pratique les compétences acquises lors des premier et second trimestres</p>
<p>Les équipes seront constituées de deux ou trois élèves (si groupe impair) de 1SIN et de deux ou trois élèves (si groupe impair) de 1ITEC et de 3 ou 4 élèves de SSI. Chaque équipe reçoit un kit constitué d’une base Makeblock Starter, 
  </p> <p>d’une carte Arduino Uno ou équivalente, d’un shield bornier à vis et d’un module de puissance L298.</p>

      <img className="news-img" style={{width: '70%', textAlign: 'center'}} src="https://static.wixstatic.com/media/f840a8_0cfeabaacd9049edba53af3c1f898bd2~mv2.png/v1/fill/w_600,h_535,al_c,q_80,usm_0.66_1.00_0.01/Mat%C3%A9riel.webp" alt="Arduino"/>
      
      <div className="card-body">
          <div className="mr-auto p-2">
          </div>
          <div className="p-2">
          </div>
        <hr className="my-2"/>
      </div>
      <p>A partir de ce matériel de base, de pièces fabriquées avec les équipements disponibles du lycée Langevin (imprimante 3D, machine de découpe laser) et de composants présents (tablette graphique, module Bluetooth, joystick, 
        </p><p>servomoteurs, etc), les équipes doivent réaliser un robot capable de ramasser des déchets de différentes natures (piles, canettes en aluminium, gobelets en plastique, rouleau en carton) et de les amener dans des lieux de tri à différents endroits du plateau de jeu.. </p>

        <p>The trick is that the liquid is actually the cathode of a battery built into the fish, which powers its two hydraulic actuators, as well as the Arduino Uno control setup. This integral battery—which would be analogous to blood in a real fish—gives it enough energy to operate untethered for 36 hours, though as it swims at 1.56 body lengths per minute, so it can use all the time it can get!</p>
        <img className="news-img" style={{width: '70%', textAlign: 'center'}} src="https://static.wixstatic.com/media/f840a8_bb71738517d0406fafcafcd2acd22927~mv2.png/v1/fill/w_928,h_520,al_c,q_85,usm_0.66_1.00_0.01/Plateau1.webp" alt="Arduino"/>
        <h5>PLANNING: </h5>
<p>Le challenge est un moment fort de l’année scolaire mais il ne doit pas prendre la totalité des séances de l’année. Le planning est le suivant :</p>
<p> 1. Semaine 6 (4 au 8 février) : distribution du règlement aux élèves

Les élèves constituent les équipes et commencent à réfléchir sur la stratégie qu’ils vont adopter pour trier les déchets et sur la réalisation du robot.</p>
<p> 2. Semaine 10 (4 au 8 mars) : compte-rendu

Les élèves doivent rendre un compte-rendu décrivant les solutions technologiques qu'ils vont adopter; avec une liste détaillée des composants qu’ils vont commander ou pièces nécessaires qu’ils vont fabriquer.</p>

<p> 3. Mettre en pratique les compétences acquises lors des premier et second trimestres</p>

<p>Les équipes seront constituées de deux ou trois élèves (si groupe impair) de 1SIN et de deux ou trois élèves (si groupe impair) de 1ITEC et de 3 ou 4 élèves de SSI. Chaque équipe reçoit un kit constitué d’une base Makeblock Starter, 
  </p> <p>Semaine 11 (11 au 15 July) : début de la réalisation du robot</p>
  <p>Semaine 20 (13 au 17 mai) : fin de la réalisation du robot</p>
  <p>Semaine 21 (22 mai) : épreuve au lycée Langevin</p>


        <iframe width="519" height="299" src="https://www.youtube.com/embed/kAIwrr4dKdg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        <hr className="my-5"/>
                <hr className="my-5"/>

                <h2>This robotic fish is powered by its own artificial circulatory system</h2>
                <p>ASJAY TEAM — June 18th, 2019</p>

                <hr className="my-5"/>

                {/* <div class="item card" style={{width: '25rem', height: '27rem'}}> */}
                      <img className="news-img" style={{width: '70%', textAlign: 'center'}} src="https://blog.arduino.cc/wp-content/uploads/2019/06/dw65fk5jibtvakcovar7-1.jpg" alt="Arduino"/>
                      <div className="card-body">
                          <div className="mr-auto p-2">
                          </div>
                          <div className="p-2">
                          </div>
                        <hr className="my-2"/>
                      </div>
                      <p>Hydraulically-actuated robots are nothing new, but normally they come with a battery or external supply of some sort. This lifelike robotic lionfish developed by Cornell and the University of Pennsylvania researchers, however, has its own artificial circulatory system that pumps synthetic ‘blood’ to help flap its fins and as the device’s power source itself. </p>

                        <p>The trick is that the liquid is actually the cathode of a battery built into the fish, which powers its two hydraulic actuators, as well as the Arduino Uno control setup. This integral battery—which would be analogous to blood in a real fish—gives it enough energy to operate untethered for 36 hours, though as it swims at 1.56 body lengths per minute, so it can use all the time it can get!</p>
                        <img className="news-img" style={{width: '70%', textAlign: 'center'}} src="https://blog.arduino.cc/wp-content/uploads/2019/06/Untitled-2-2-1.png" alt="Arduino"/>
                        <p>You can also read more in <a style={{color: 'blue'}} href="https://spectrum.ieee.org/automaton/robotics/robotics-hardware/robot-fish-synthetic-blood">IEEE Spectrum‘s article here.</a></p>
                        <iframe className="news-vid" width="770" height="500" src="https://www.youtube.com/embed/JiCl15HF4R4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <hr className="my-5"/>
                        <h2>Synchronized bike lighting inspired by nature</h2>
                        <p>ASJAY TEAM — May 12th, 2019</p>

                        <hr className="my-5"/>

                {/* <div class="item card" style={{width: '25rem', height: '27rem'}}> */}
                      <img className="news-img" style={{width: '70%', textAlign: 'center'}} src="https://blog.arduino.cc/wp-content/uploads/2019/06/IMG_2978.jpg.1400x1400.jpg" alt="Arduino"/>
                      <div className="card-body">
                          <div className="mr-auto p-2">
                          </div>
                          <div className="p-2">
                          </div>
                        <hr className="my-2"/>
                      </div>
                      <p>Having a light on your bike at night is important for safety, but what if those headlights could talk to others sharing the road with you? Well now it can, using the <a style={{color: 'blue'}} href="https://www.media.mit.edu/projects/bike-swarm/overview/">[Bike] Swarm</a>by Alex Berke, Thomas Sanchez, and Kent Larson from the MIT Media Lab.</p>

                        <p>Their device—or collection of devices—controls a bicycle’s lighting via an Arduino and LED driver, and features an nRF24L01 wireless module to communicate with others in the vicinity. When another rider is encountered, the bikes sync their lights up automatically.</p>
                        <p>The team has already designed and fabricated prototypes, then strapped them onto local city bike share program bikes for testing. </p>
                        <p>It’s an interesting effect when two bikes pass, but as shown in the video below, things get much more fascinating when a handful of bikes can coordinate both their direction and light pattern.</p>
                        
                        <iframe className="news-vid" width="770" height="500" src="https://www.youtube.com/embed/wUl-CHJ6DK0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
