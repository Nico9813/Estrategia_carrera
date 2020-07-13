import Plan from "../domain/Plan";
import Materia from "../domain/Materia";
import { CargaHoraria } from "../domain/CargaHoraria";

var k08_sistemas = new Plan("K08 Ingenieria en sistemas")

//Primero
let alg = new Materia(CargaHoraria.ANUAL, "Algoritmos y estructuras de datos");
let am1 = new Materia(CargaHoraria.ANUAL, "Analisis Matematico I");
let alge = new Materia(CargaHoraria.ANUAL, "Algebra y geometria analitica");
let dis = new Materia(CargaHoraria.ANUAL, "Matematica Discreta");
let ing1 = new Materia(CargaHoraria.CUATRIMESTRAL, "Ingles I");
let sisy = new Materia(CargaHoraria.ANUAL, "Sistemas y organizaciones");
let arq = new Materia(CargaHoraria.ANUAL, "Arquitectura de computadoras");
let qui = new Materia(CargaHoraria.CUATRIMESTRAL, "Quimica");
let ingSoc = new Materia(CargaHoraria.CUATRIMESTRAL, "Ingenieria y sociedad");

//Segundo
let ads = new Materia(CargaHoraria.ANUAL, "Analisis de sistemas");
ads.agregar_correlativa_cursar(sisy)
ads.agregar_correlativa_cursar(alg)
ads.agregar_correlativa_rendir(sisy)
ads.agregar_correlativa_rendir(alg)

let pdp = new Materia(CargaHoraria.ANUAL, "Paradigmas de programacion");
pdp.agregar_correlativa_cursar(dis)
pdp.agregar_correlativa_cursar(alg)
pdp.agregar_correlativa_rendir(dis)
pdp.agregar_correlativa_rendir(alg)

let am2 = new Materia(CargaHoraria.ANUAL, "Analisis Matematico II");
am2.agregar_correlativa_cursar(am1)
am2.agregar_correlativa_cursar(alge)
am2.agregar_correlativa_rendir(am1)
am2.agregar_correlativa_rendir(alge)

let sisR = new Materia(CargaHoraria.ANUAL, "Sistemas de Representacion");

let sint = new Materia(CargaHoraria.ANUAL, "Sintaxis y semantica de los lenguajes");
sint.agregar_correlativa_cursar(dis)
sint.agregar_correlativa_cursar(alg)
sint.agregar_correlativa_rendir(dis)
sint.agregar_correlativa_rendir(alg)

let fis1 = new Materia(CargaHoraria.ANUAL, "Fisica I");

let prob = new Materia(CargaHoraria.CUATRIMESTRAL, "Probabilidad y estadistica");
prob.agregar_correlativa_cursar(am1)
prob.agregar_correlativa_cursar(alge)
prob.agregar_correlativa_rendir(am1)
prob.agregar_correlativa_rendir(alge)

//Tercero
let dds = new Materia(CargaHoraria.ANUAL, "Disenio de sistemas");
dds.agregar_correlativa_cursar(ads)
dds.agregar_correlativa_cursar(pdp)
dds.agregar_correlativa_final_cursar(dis)
dds.agregar_correlativa_final_cursar(alg)
dds.agregar_correlativa_final_cursar(sisy)
dds.agregar_correlativa_rendir(ads)
dds.agregar_correlativa_rendir(pdp)

let so = new Materia(CargaHoraria.CUATRIMESTRAL, "Sistemas operativos");
so.agregar_correlativa_cursar(dis)
so.agregar_correlativa_cursar(pdp)
so.agregar_correlativa_cursar(arq)
so.agregar_correlativa_rendir(dis)
so.agregar_correlativa_rendir(pdp)
so.agregar_correlativa_rendir(arq)

let fis2 = new Materia(CargaHoraria.CUATRIMESTRAL, "Fisica II");
fis2.agregar_correlativa_cursar(am1)
fis2.agregar_correlativa_cursar(fis1)
fis2.agregar_correlativa_rendir(am1)
fis2.agregar_correlativa_rendir(fis1)

let eco = new Materia(CargaHoraria.CUATRIMESTRAL, "Economia");
eco.agregar_correlativa_cursar(ads)
eco.agregar_correlativa_final_cursar(alg)
eco.agregar_correlativa_final_cursar(sisy)
eco.agregar_correlativa_rendir(ads)

let gdd = new Materia(CargaHoraria.CUATRIMESTRAL, "Gestion de datos");
gdd.agregar_correlativa_cursar(ads)
gdd.agregar_correlativa_cursar(pdp)
gdd.agregar_correlativa_cursar(sint)
gdd.agregar_correlativa_final_cursar(dis)
gdd.agregar_correlativa_final_cursar(alg)
gdd.agregar_correlativa_final_cursar(sisy)
gdd.agregar_correlativa_rendir(ads)
gdd.agregar_correlativa_rendir(pdp)
gdd.agregar_correlativa_rendir(sint)

let ing2 = new Materia(CargaHoraria.CUATRIMESTRAL, "Ingles II");
ing2.agregar_correlativa_cursar(ing1)
ing2.agregar_correlativa_rendir(ing1)

let sup = new Materia(CargaHoraria.CUATRIMESTRAL, "Matematica superior");
sup.agregar_correlativa_cursar(am2)
sup.agregar_correlativa_final_cursar(am1)
sup.agregar_correlativa_final_cursar(alge)
sup.agregar_correlativa_rendir(am2)

let electivaTercero1 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Tercero")
electivaTercero1.agregar_correlativa_cursar(ads)
electivaTercero1.agregar_correlativa_cursar(sint)
electivaTercero1.agregar_correlativa_cursar(pdp)
electivaTercero1.agregar_correlativa_rendir(ads)
electivaTercero1.agregar_correlativa_rendir(sint)
electivaTercero1.agregar_correlativa_rendir(pdp)

let electivaTercero2 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Tercero")
electivaTercero2.agregar_correlativa_cursar(ads)
electivaTercero2.agregar_correlativa_cursar(sint)
electivaTercero2.agregar_correlativa_cursar(pdp)
electivaTercero2.agregar_correlativa_rendir(ads)
electivaTercero2.agregar_correlativa_rendir(sint)
electivaTercero2.agregar_correlativa_rendir(pdp)

//Cuarto
let adr = new Materia(CargaHoraria.ANUAL, "Administracion de recursos");
adr.agregar_correlativa_cursar(dds)
adr.agregar_correlativa_cursar(so)
adr.agregar_correlativa_cursar(eco)
adr.agregar_correlativa_final_cursar(arq)
adr.agregar_correlativa_final_cursar(ing2)
adr.agregar_correlativa_final_cursar(ads)
adr.agregar_correlativa_final_cursar(pdp)
adr.agregar_correlativa_rendir(dds)
adr.agregar_correlativa_rendir(so)
adr.agregar_correlativa_rendir(eco)

let leg = new Materia(CargaHoraria.CUATRIMESTRAL, "Legislacion");
leg.agregar_correlativa_cursar(ads)
leg.agregar_correlativa_cursar(ingSoc)
leg.agregar_correlativa_final_cursar(sisy)
leg.agregar_correlativa_final_cursar(alg)
leg.agregar_correlativa_rendir(ads)
leg.agregar_correlativa_rendir(ingSoc)

let ing = new Materia(CargaHoraria.CUATRIMESTRAL, "Ingenieria en Software");
ing.agregar_correlativa_cursar(prob)
ing.agregar_correlativa_cursar(dds)
ing.agregar_correlativa_cursar(gdd)
ing.agregar_correlativa_final_cursar(ads)
ing.agregar_correlativa_final_cursar(sint)
ing.agregar_correlativa_final_cursar(pdp)
ing.agregar_correlativa_rendir(prob)
ing.agregar_correlativa_rendir(dds)
ing.agregar_correlativa_rendir(gdd)

let teo = new Materia(CargaHoraria.CUATRIMESTRAL, "Teoria de control");
teo.agregar_correlativa_cursar(qui)
teo.agregar_correlativa_cursar(sup)
teo.agregar_correlativa_final_cursar(am2)
teo.agregar_correlativa_final_cursar(fis2)
teo.agregar_correlativa_rendir(qui)
teo.agregar_correlativa_rendir(sup)

let com = new Materia(CargaHoraria.CUATRIMESTRAL, "Comunicaciones");
com.agregar_correlativa_cursar(arq)
com.agregar_correlativa_cursar(am2)
com.agregar_correlativa_cursar(fis2)
com.agregar_correlativa_final_cursar(am1)
com.agregar_correlativa_final_cursar(alge)
com.agregar_correlativa_final_cursar(fis1)
com.agregar_correlativa_rendir(arq)
com.agregar_correlativa_rendir(am2)
com.agregar_correlativa_rendir(fis2)

let red = new Materia(CargaHoraria.CUATRIMESTRAL, "Redes de comunicacion");
red.agregar_correlativa_cursar(so)
red.agregar_correlativa_cursar(com)
red.agregar_correlativa_final_cursar(dis)
red.agregar_correlativa_final_cursar(alg)
red.agregar_correlativa_final_cursar(arq)
red.agregar_correlativa_final_cursar(am2)
red.agregar_correlativa_final_cursar(fis2)
red.agregar_correlativa_rendir(com)
red.agregar_correlativa_rendir(so)

let inv = new Materia(CargaHoraria.CUATRIMESTRAL, "Investigacion Operativa");
inv.agregar_correlativa_cursar(prob)
inv.agregar_correlativa_cursar(sup)
inv.agregar_correlativa_final_cursar(am2)
inv.agregar_correlativa_rendir(prob)
inv.agregar_correlativa_rendir(sup)

let sim = new Materia(CargaHoraria.CUATRIMESTRAL, "Simulacion");
sim.agregar_correlativa_cursar(prob)
sim.agregar_correlativa_cursar(sup)
sim.agregar_correlativa_final_cursar(am2)
sim.agregar_correlativa_rendir(prob)
sim.agregar_correlativa_rendir(sup)

let electivaCuarto = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Cuarto")
electivaCuarto.agregar_correlativa_cursar(dds)
electivaCuarto.agregar_correlativa_cursar(so)
electivaCuarto.agregar_correlativa_cursar(gdd)
electivaCuarto.agregar_correlativa_final_cursar(ads)
electivaCuarto.agregar_correlativa_final_cursar(sint)
electivaCuarto.agregar_correlativa_rendir(dds)
electivaCuarto.agregar_correlativa_rendir(so)
electivaCuarto.agregar_correlativa_rendir(gdd)


//Quinto
let pro = new Materia(CargaHoraria.ANUAL, "Proyecto final");
pro.agregar_correlativa_cursar(leg)
pro.agregar_correlativa_cursar(adr)
pro.agregar_correlativa_final_cursar(ingSoc)
pro.agregar_correlativa_final_cursar(sisR)
pro.agregar_correlativa_final_cursar(prob)
pro.agregar_correlativa_final_cursar(so)
pro.agregar_correlativa_final_cursar(dds)
pro.agregar_correlativa_final_cursar(gdd)
pro.agregar_correlativa_final_cursar(eco)
pro.agregar_correlativa_final_cursar(ing2)
pro.agregar_correlativa_final_cursar(com)
pro.agregar_correlativa_cursar(red)
pro.agregar_correlativa_cursar(ing)

let ia = new Materia(CargaHoraria.CUATRIMESTRAL, "Inteligencia Artificial");
ia.agregar_correlativa_cursar(inv)
ia.agregar_correlativa_cursar(sim)
ia.agregar_correlativa_final_cursar(prob)
ia.agregar_correlativa_final_cursar(dds)
ia.agregar_correlativa_final_cursar(sup)
ia.agregar_correlativa_rendir(inv)
ia.agregar_correlativa_rendir(sim)

let adm = new Materia(CargaHoraria.CUATRIMESTRAL, "Administracion gerencial");
adm.agregar_correlativa_cursar(adr)
adm.agregar_correlativa_cursar(inv)
adm.agregar_correlativa_final_cursar(prob)
adm.agregar_correlativa_final_cursar(so)
adm.agregar_correlativa_final_cursar(dds)
adm.agregar_correlativa_final_cursar(sup)
adm.agregar_correlativa_final_cursar(eco)
adm.agregar_correlativa_rendir(adr)
adm.agregar_correlativa_rendir(inv)

let ges = new Materia(CargaHoraria.CUATRIMESTRAL, "Sitemas de Gestion");
ges.agregar_correlativa_cursar(adr)
ges.agregar_correlativa_cursar(inv)
ges.agregar_correlativa_cursar(sim)
ges.agregar_correlativa_final_cursar(prob)
ges.agregar_correlativa_final_cursar(so)
ges.agregar_correlativa_final_cursar(dds)
ges.agregar_correlativa_final_cursar(sup)
ges.agregar_correlativa_final_cursar(eco)
ges.agregar_correlativa_rendir(adr)
ges.agregar_correlativa_rendir(inv)
ges.agregar_correlativa_rendir(sim)

let electivaQuinto1 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Quinto")
electivaQuinto1.agregar_correlativa_cursar(adr)
electivaQuinto1.agregar_correlativa_cursar(red)
electivaQuinto1.agregar_correlativa_cursar(sim)
electivaQuinto1.agregar_correlativa_cursar(ing)
electivaQuinto1.agregar_correlativa_final_cursar(dds)
electivaQuinto1.agregar_correlativa_final_cursar(so)
electivaQuinto1.agregar_correlativa_final_cursar(gdd)
electivaQuinto1.agregar_correlativa_rendir(adr)
electivaQuinto1.agregar_correlativa_rendir(red)
electivaQuinto1.agregar_correlativa_rendir(sim)
electivaQuinto1.agregar_correlativa_rendir(ing)

let electivaQuinto2 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Quinto")
electivaQuinto2.agregar_correlativa_cursar(adr)
electivaQuinto2.agregar_correlativa_cursar(red)
electivaQuinto2.agregar_correlativa_cursar(sim)
electivaQuinto2.agregar_correlativa_cursar(ing)
electivaQuinto2.agregar_correlativa_final_cursar(dds)
electivaQuinto2.agregar_correlativa_final_cursar(so)
electivaQuinto2.agregar_correlativa_final_cursar(gdd)
electivaQuinto2.agregar_correlativa_rendir(adr)
electivaQuinto2.agregar_correlativa_rendir(red)
electivaQuinto2.agregar_correlativa_rendir(sim)
electivaQuinto2.agregar_correlativa_rendir(ing)

let electivaQuinto3 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Quinto")
electivaQuinto3.agregar_correlativa_cursar(adr)
electivaQuinto3.agregar_correlativa_cursar(red)
electivaQuinto3.agregar_correlativa_cursar(sim)
electivaQuinto3.agregar_correlativa_cursar(ing)
electivaQuinto3.agregar_correlativa_final_cursar(dds)
electivaQuinto3.agregar_correlativa_final_cursar(so)
electivaQuinto3.agregar_correlativa_final_cursar(gdd)
electivaQuinto3.agregar_correlativa_rendir(adr)
electivaQuinto3.agregar_correlativa_rendir(red)
electivaQuinto3.agregar_correlativa_rendir(sim)
electivaQuinto3.agregar_correlativa_rendir(ing)

let electivaQuinto4 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Quinto")
electivaQuinto4.agregar_correlativa_cursar(adr)
electivaQuinto4.agregar_correlativa_cursar(red)
electivaQuinto4.agregar_correlativa_cursar(sim)
electivaQuinto4.agregar_correlativa_cursar(ing)
electivaQuinto4.agregar_correlativa_final_cursar(dds)
electivaQuinto4.agregar_correlativa_final_cursar(so)
electivaQuinto4.agregar_correlativa_final_cursar(gdd)
electivaQuinto4.agregar_correlativa_rendir(adr)
electivaQuinto4.agregar_correlativa_rendir(red)
electivaQuinto4.agregar_correlativa_rendir(sim)
electivaQuinto4.agregar_correlativa_rendir(ing)

let electivaQuinto5 = new Materia(CargaHoraria.CUATRIMESTRAL, "Electiva Quinto")
electivaQuinto5.agregar_correlativa_cursar(adr)
electivaQuinto5.agregar_correlativa_cursar(red)
electivaQuinto5.agregar_correlativa_cursar(sim)
electivaQuinto5.agregar_correlativa_cursar(ing)
electivaQuinto5.agregar_correlativa_final_cursar(dds)
electivaQuinto5.agregar_correlativa_final_cursar(so)
electivaQuinto5.agregar_correlativa_final_cursar(gdd)
electivaQuinto5.agregar_correlativa_rendir(adr)
electivaQuinto5.agregar_correlativa_rendir(red)
electivaQuinto5.agregar_correlativa_rendir(sim)
electivaQuinto5.agregar_correlativa_rendir(ing)


k08_sistemas.agregar_materia(alge)
k08_sistemas.agregar_materia(am1)
k08_sistemas.agregar_materia(dis)
k08_sistemas.agregar_materia(alg)
k08_sistemas.agregar_materia(arq)
k08_sistemas.agregar_materia(sisy)
k08_sistemas.agregar_materia(ingSoc)

k08_sistemas.agregar_materia(ads)
k08_sistemas.agregar_materia(sisR)
k08_sistemas.agregar_materia(am2)
k08_sistemas.agregar_materia(sint)
k08_sistemas.agregar_materia(fis1)
k08_sistemas.agregar_materia(pdp)
k08_sistemas.agregar_materia(ing1)
k08_sistemas.agregar_materia(prob)

k08_sistemas.agregar_materia(dds)
k08_sistemas.agregar_materia(so)
k08_sistemas.agregar_materia(fis2)
k08_sistemas.agregar_materia(eco)
k08_sistemas.agregar_materia(gdd)
k08_sistemas.agregar_materia(ing2)
k08_sistemas.agregar_materia(sup)
k08_sistemas.agregar_materia(leg)
k08_sistemas.agregar_materia(electivaTercero1)
k08_sistemas.agregar_materia(electivaTercero2)

k08_sistemas.agregar_materia(adr)
k08_sistemas.agregar_materia(ing)
k08_sistemas.agregar_materia(teo)
k08_sistemas.agregar_materia(com)
k08_sistemas.agregar_materia(red)
k08_sistemas.agregar_materia(inv)
k08_sistemas.agregar_materia(sim)
k08_sistemas.agregar_materia(electivaCuarto)

k08_sistemas.agregar_materia(ges)
k08_sistemas.agregar_materia(adm)
k08_sistemas.agregar_materia(ia)
k08_sistemas.agregar_materia(pro)
k08_sistemas.agregar_materia(electivaQuinto1)
k08_sistemas.agregar_materia(electivaQuinto2)
k08_sistemas.agregar_materia(electivaQuinto3)
k08_sistemas.agregar_materia(electivaQuinto4)
k08_sistemas.agregar_materia(electivaQuinto5)

k08_sistemas.finalizarCreacion()

export { k08_sistemas };



