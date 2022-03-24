#!/usr/bin/env node

import shelljs from 'shelljs';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';

const iniciar = () => {
    console.log(
        chalk.green(
            figlet.textSync("Creador ficheros", {
                font: "Bubble",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const hacerPreguntas = () => {
    const preguntas = [
        {
            name: "FICHERO",
            type: "input",
            message: "¿Cómo se va a llamar tu fichero? (sin extensión)"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "¿Qué extensión tiene tu fichero?",
            choices: [".rb",".js",".kt",".java",".ts",".php"],
            filter: function(val) {
                return val.split(".")[1];
            }
        }
    ];

    return inquirer.prompt(preguntas);
};

const crearFichero = (nombreFichero, extension) => {
    const pathFichero = `${process.cwd()}/${nombreFichero}.${extension}`;
    console.log('PATH --> ',pathFichero);

    shelljs.touch(pathFichero);

    return pathFichero;
};

const ficheroOk = (filePath) => {
    console.log(
        chalk.white.bgGreen.bold(
            `Muy bien, Fichero creado correctamente en ${filePath}`
        )   
    );
};

const ejecutar = async () => {
    // Mostrar la información de la liberaría en la cabecera, titulo con figlet
    iniciar();

    // Preguntas necesarias para crear el fichero
    const respuestas = await hacerPreguntas();
    const { FICHERO, EXTENSION } = respuestas;

    // Crear el fichero
    const pathFichero = crearFichero(FICHERO, EXTENSION);

    // Añadimos mensaje que el fichero se ha creado satisfactoriamente
    ficheroOk(pathFichero);
};

ejecutar();