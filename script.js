/* =====================================================
   DRAGON VOLUME
   JAVASCRIPT PRINCIPAL

   Este archivo controla:

   1. Calculadora de volumen
   2. Figuras 3D
   3. Rotación con mouse
   4. Efectos del cursor
   5. Nivel de poder
   6. Minijuego del Guerrero Z
===================================================== */


/* =====================================================
   MOUSE LIGHT
   Hace que una luz siga la posición del mouse.
===================================================== */

const mouseLight = document.querySelector(".mouse-light");

document.addEventListener("mousemove", e => {

    mouseLight.style.left = e.clientX + "px";
    mouseLight.style.top = e.clientY + "px";

});


/* =====================================================
   DATOS DE LAS FIGURAS
   Guardamos la información de cada figura en un objeto.
===================================================== */

const shapes = {

    cubo: {
        title: "Volumen del Cubo",
        formula: "V = lado³",
        explanation:
            "El volumen de un cubo se obtiene multiplicando el lado tres veces."
    },

    piramide: {
        title: "Volumen de la Pirámide",
        formula: "V = (B × h) / 3",
        explanation:
            "Multiplica el área de la base por la altura y divide el resultado entre 3."
    },

    esfera: {
        title: "Volumen de la Esfera",
        formula: "V = 4/3 × π × r³",
        explanation:
            "El volumen de una esfera se obtiene utilizando su radio elevado al cubo."
    },

    cono: {
        title: "Volumen del Cono",
        formula: "V = π × r² × h / 3",
        explanation:
            "Multiplica π por el radio al cuadrado y por la altura. Después divide entre 3."
    }

};


/* =====================================================
   ELEMENTOS DE LA CALCULADORA
===================================================== */

const inputsArea = document.getElementById("inputsArea");

const calcTitle = document.getElementById("calcTitle");
const calcFormula = document.getElementById("calcFormula");
const calcNumber = document.getElementById("calcNumber");

const formulaExplanation =
    document.getElementById("formulaExplanation");

const result = document.getElementById("result");
const resultUnit = document.getElementById("resultUnit");

const buttons = document.querySelectorAll(".shape-btn");

let currentShape = "cubo";


/* =====================================================
   CREAR CAMPOS
   Dependiendo de la figura se crean diferentes inputs.
===================================================== */

function createInputs(shape) {

    inputsArea.innerHTML = "";

    if (shape === "cubo") {

        createInput(
            "lado",
            "Medida del lado",
            "Ejemplo: 5"
        );

    }

    if (shape === "piramide") {

        createInput(
            "base",
            "Área de la base",
            "Ejemplo: 20"
        );

        createInput(
            "altura",
            "Altura",
            "Ejemplo: 10"
        );

    }

    if (shape === "esfera") {

        createInput(
            "radio",
            "Radio",
            "Ejemplo: 5"
        );

    }

    if (shape === "cono") {

        createInput(
            "radioCono",
            "Radio",
            "Ejemplo: 4"
        );

        createInput(
            "alturaCono",
            "Altura",
            "Ejemplo: 8"
        );

    }

}


/* =====================================================
   FUNCIÓN PARA CREAR INPUT
   Crea dinámicamente un campo de entrada.
===================================================== */

function createInput(id, label, placeholder) {

    const div = document.createElement("div");

    div.className = "input-group";

    div.innerHTML = `
        <label for="${id}">
            ${label}
        </label>

        <input
            type="number"
            id="${id}"
            min="0"
            step="any"
            placeholder="${placeholder}"
        >
    `;

    inputsArea.appendChild(div);

}


/* =====================================================
   CAMBIAR FIGURA
===================================================== */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(b =>
            b.classList.remove("active")
        );

        button.classList.add("active");

        currentShape = button.dataset.shape;

        const data = shapes[currentShape];

        calcTitle.textContent = data.title;
        calcFormula.textContent = data.formula;

        formulaExplanation.textContent =
            data.explanation;

        const number = {
            cubo: "01",
            piramide: "02",
            esfera: "03",
            cono: "04"
        };

        calcNumber.textContent =
            number[currentShape];

        createInputs(currentShape);

        result.textContent = "0";

    });

});


/* =====================================================
   CALCULAR
===================================================== */

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculate);


function calculate() {

    const unit =
        document.getElementById("unit").value;

    let volume = 0;


    /* CUBO */

    if (currentShape === "cubo") {

        const lado =
            Number(document.getElementById("lado").value);

        if (!valid(lado)) return;

        volume = Math.pow(lado, 3);

    }


    /* PIRÁMIDE */

    if (currentShape === "piramide") {

        const base =
            Number(document.getElementById("base").value);

        const altura =
            Number(document.getElementById("altura").value);

        if (!valid(base) || !valid(altura)) return;

        volume = (base * altura) / 3;

    }


    /* ESFERA */

    if (currentShape === "esfera") {

        const radio =
            Number(document.getElementById("radio").value);

        if (!valid(radio)) return;

        volume =
            (4 / 3) *
            Math.PI *
            Math.pow(radio, 3);

    }


    /* CONO */

    if (currentShape === "cono") {

        const radio =
            Number(document.getElementById("radioCono").value);

        const altura =
            Number(document.getElementById("alturaCono").value);

        if (!valid(radio) || !valid(altura)) return;

        volume =
            Math.PI *
            Math.pow(radio, 2) *
            altura / 3;

    }


    /* MOSTRAR RESULTADO */

    result.textContent =
        volume.toLocaleString("es-CO", {
            maximumFractionDigits: 2
        });

    resultUnit.textContent =
        unit + "³";


    /* AUMENTAR NIVEL */

    increasePower();

}


/* =====================================================
   VALIDAR DATOS
===================================================== */

function valid(value) {

    if (isNaN(value) || value <= 0) {

        alert("⚠️ Introduce valores mayores que 0.");

        return false;
    }

    return true;

}


/* =====================================================
   LIMPIAR CALCULADORA
===================================================== */

document
    .getElementById("clearBtn")
    .addEventListener("click", () => {

        document
            .querySelectorAll(".calculator-panel input")
            .forEach(input => {
                input.value = "";
            });

        result.textContent = "0";

    });


/* =====================================================
   NIVEL DE PODER
===================================================== */

let power = 20;

function increasePower() {

    power += 8;

    if (power > 100)
        power = 20;

    document.getElementById("levelBar")
        .style.width = power + "%";

    document.getElementById("levelText")
        .textContent =
        Math.ceil(power / 20);

}


/* =====================================================
   THREE.JS
   SISTEMA DE FIGURAS 3D

   IMPORTANTE:
   Esta parte conserva la lógica original de las figuras.
===================================================== */

function create3D(containerId, geometry) {

    const container =
        document.getElementById(containerId);

    const scene = new THREE.Scene();


    /* CÁMARA */

    const camera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            0.1,
            100
        );

    camera.position.set(0, 0, 5);


    /* RENDER */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);


    /* ILUMINACIÓN */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            .7
        );

    scene.add(ambient);


    const light =
        new THREE.PointLight(
            0xff9900,
            2,
            20
        );

    light.position.set(3, 3, 4);

    scene.add(light);


    const blueLight =
        new THREE.PointLight(
            0x247cff,
            1.5,
            15
        );

    blueLight.position.set(-4, -2, 3);

    scene.add(blueLight);


    /* MATERIAL */

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xff7a00,
            metalness: .35,
            roughness: .25
        });


    /* FIGURA */

    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(mesh);


    /* BORDE */

    const edges =
        new THREE.EdgesGeometry(geometry);

    const line =
        new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({
                color: 0xffd000,
                transparent: true,
                opacity: .5
            })
        );

    mesh.add(line);


    /* ROTACIÓN */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let dragging = false;

    let previousX = 0;
    let previousY = 0;


    /* MOUSE DOWN */

    container.addEventListener(
        "pointerdown",
        e => {

            dragging = true;

            previousX = e.clientX;
            previousY = e.clientY;

        }
    );


    /* MOUSE MOVE */

    container.addEventListener(
        "pointermove",
        e => {

            if (!dragging) return;

            const movementX =
                e.clientX - previousX;

            const movementY =
                e.clientY - previousY;

            targetY += movementX * .012;
            targetX += movementY * .012;

            previousX = e.clientX;
            previousY = e.clientY;

        }
    );


    /* MOUSE UP */

    window.addEventListener(
        "pointerup",
        () => {
            dragging = false;
        }
    );


    /* ANIMACIÓN */

    function animate() {

        requestAnimationFrame(animate);


        /* Auto-rotación */

        if (!dragging) {
            targetY += .004;
        }


        /* Suavizado */

        currentX +=
            (targetX - currentX) * .08;

        currentY +=
            (targetY - currentY) * .08;


        mesh.rotation.x = currentX;
        mesh.rotation.y = currentY;


        renderer.render(
            scene,
            camera
        );

    }

    animate();


    /* RESPONSIVE */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;

            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();

            renderer.setSize(
                width,
                height
            );

        }
    );

}


/* =====================================================
   CREAR LAS 4 FIGURAS
   Las geometrías son exactamente las mismas.
===================================================== */


/* CUBO */

create3D(
    "cube3d",
    new THREE.BoxGeometry(
        2.2,
        2.2,
        2.2
    )
);


/* PIRÁMIDE */

create3D(
    "pyramid3d",
    new THREE.ConeGeometry(
        1.55,
        2.5,
        4
    )
);


/* ESFERA */

create3D(
    "sphere3d",
    new THREE.SphereGeometry(
        1.45,
        40,
        40
    )
);


/* CONO */

create3D(
    "cone3d",
    new THREE.ConeGeometry(
        1.5,
        2.7,
        48
    )
);


/* =====================================================
   EFECTO TILT PARA TARJETAS
   Hace que las tarjetas tengan una pequeña inclinación
   siguiendo la posición del mouse.
===================================================== */

document
    .querySelectorAll(".figure-card, .level-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 5;

                const rotateX =
                    ((y / rect.height) - .5) * -5;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


/* =====================================================
   CREAR CAMPOS INICIALES
===================================================== */

createInputs("cubo");



/* =====================================================
   DESAFÍO DEL GUERRERO Z
   Minijuego interactivo de preguntas sobre volumen.
===================================================== */


/*
   Cada objeto representa una pregunta.

   question:
   Es el texto que verá el jugador.

   answers:
   Son las posibles respuestas.

   correct:
   Es la respuesta correcta.
*/

const challenges = [

    {
        question: "¿Cuál es el volumen de un cubo cuyo lado mide 5 cm?",
        answers: ["100 cm³", "125 cm³", "25 cm³", "150 cm³"],
        correct: "125 cm³"
    },

    {
        question: "¿Cuál es el volumen de un cubo cuyo lado mide 3 cm?",
        answers: ["9 cm³", "18 cm³", "27 cm³", "12 cm³"],
        correct: "27 cm³"
    },

    {
        question: "Una pirámide tiene un área de base de 30 cm² y una altura de 6 cm. ¿Cuál es su volumen?",
        answers: ["60 cm³", "90 cm³", "180 cm³", "30 cm³"],
        correct: "60 cm³"
    },

    {
        question: "¿Qué número se utiliza para representar aproximadamente a π?",
        answers: ["2.14", "3.14", "4.14", "1.14"],
        correct: "3.14"
    },

    {
        question: "¿Cuál es la fórmula del volumen de una esfera?",
        answers: [
            "π × r² × h",
            "lado³",
            "4/3 × π × r³",
            "B × h / 3"
        ],
        correct: "4/3 × π × r³"
    },

    {
        question: "Un cono tiene radio 3 cm y altura 5 cm. ¿Qué fórmula debes utilizar?",
        answers: [
            "π × r² × h / 3",
            "lado³",
            "B × h / 3",
            "4/3 × π × r³"
        ],
        correct: "π × r² × h / 3"
    }

];


/* =====================================================
   VARIABLES DEL JUEGO
===================================================== */

let currentQuestion = 0;

let gameScore = 0;

let gameStreak = 0;

let gameKi = 0;


/* =====================================================
   ELEMENTOS DEL JUEGO
===================================================== */

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const answerGrid =
    document.getElementById("answerGrid");

const gameScoreElement =
    document.getElementById("gameScore");

const gameStreakElement =
    document.getElementById("gameStreak");

const kiBar =
    document.getElementById("kiBar");

const kiText =
    document.getElementById("kiText");

const battleMessage =
    document.getElementById("battleMessage");

const nextQuestion =
    document.getElementById("nextQuestion");

const finalResult =
    document.getElementById("finalResult");

const finalTitle =
    document.getElementById("finalTitle");

const finalText =
    document.getElementById("finalText");

const finalScore =
    document.getElementById("finalScore");

const restartGame =
    document.getElementById("restartGame");


/* =====================================================
   CARGAR PREGUNTA
===================================================== */

function loadQuestion() {

    const challenge =
        challenges[currentQuestion];


    /* Mostrar número de pregunta */

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    /* Mostrar pregunta */

    questionText.textContent =
        challenge.question;


    /* Limpiar opciones anteriores */

    answerGrid.innerHTML = "";


    /* Crear botones */

    challenge.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.dataset.answer = answer;

        answerGrid.appendChild(button);

    });


    /* Activar eventos de los botones */

    document
        .querySelectorAll(".answer-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                checkAnswer
            );

        });


    /* Ocultar botón siguiente */

    nextQuestion.style.display = "none";


    /* Limpiar mensaje */

    battleMessage.textContent =
        "⚡ ¡Demuestra tu poder matemático!";

    battleMessage.className =
        "battle-message";

}


/* =====================================================
   COMPROBAR RESPUESTA
===================================================== */

function checkAnswer(event) {

    const selectedButton =
        event.currentTarget;

    const selectedAnswer =
        selectedButton.dataset.answer;

    const correctAnswer =
        challenges[currentQuestion].correct;


    /* Evitar que el jugador responda varias veces */

    document
        .querySelectorAll(".answer-btn")
        .forEach(button => {

            button.classList.add("disabled");

        });


    /* RESPUESTA CORRECTA */

    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        gameScore += 100;

        gameStreak++;

        gameKi += 20;

        if (gameKi > 100) {
            gameKi = 100;
        }


        gameScoreElement.textContent =
            gameScore;

        gameStreakElement.textContent =
            gameStreak + " 🔥";


        kiBar.style.width =
            gameKi + "%";

        kiText.textContent =
            gameKi + "%";


        battleMessage.textContent =
            getSuccessMessage();

        battleMessage.className =
            "battle-message success";


        /*
           Efecto visual para indicar
           que el jugador aumentó su poder.
        */

        document
            .querySelector(".z-challenge")
            .classList.add("power-up");

        setTimeout(() => {

            document
                .querySelector(".z-challenge")
                .classList.remove("power-up");

        }, 600);

    }


    /* RESPUESTA INCORRECTA */

    else {

        selectedButton.classList.add("wrong");

        gameStreak = 0;

        gameStreakElement.textContent =
            "0 🔥";

        battleMessage.textContent =
            "💥 ¡Fallaste! La respuesta correcta era " +
            correctAnswer;

        battleMessage.className =
            "battle-message error";


        /*
           Mostrar cuál era la respuesta correcta.
        */

        document
            .querySelectorAll(".answer-btn")
            .forEach(button => {

                if (
                    button.dataset.answer ===
                    correctAnswer
                ) {

                    button.classList.add("correct");

                }

            });

    }


    /* Mostrar botón para continuar */

    if (
        currentQuestion <
        challenges.length - 1
    ) {

        nextQuestion.style.display =
            "block";

    } else {

        /*
           Si no quedan preguntas,
           mostramos el resultado final.
        */

        setTimeout(showFinalResult, 800);

    }

}


/* =====================================================
   MENSAJES DE ÉXITO
   Devuelve diferentes frases para que el juego
   no muestre siempre el mismo mensaje.
===================================================== */

function getSuccessMessage() {

    const messages = [

        "🔥 ¡INCREÍBLE! Tu poder matemático aumenta.",

        "⚡ ¡ATAQUE PERFECTO! Has dominado la fórmula.",

        "💥 ¡KAMEHAMEHA MATEMÁTICO!",

        "🔥 ¡SUPER SAIYAN! Respuesta correcta.",

        "🐉 ¡SHENLONG ESTÁ IMPRESIONADO!",

        "⚡ ¡TU KI MATEMÁTICO ESTÁ SUBIENDO!"

    ];

    const randomIndex =
        Math.floor(
            Math.random() * messages.length
        );

    return messages[randomIndex];

}


/* =====================================================
   SIGUIENTE PREGUNTA
===================================================== */

nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;

        loadQuestion();

    }
);


/* =====================================================
   MOSTRAR RESULTADO FINAL
===================================================== */

function showFinalResult() {

    finalResult.style.display = "block";

    answerGrid.style.display = "none";

    nextQuestion.style.display = "none";


    finalScore.textContent =
        gameScore + " PUNTOS";


    if (gameScore >= 500) {

        finalTitle.textContent =
            "🔥 ¡NIVEL DIOS SAIYAN!";

        finalText.textContent =
            "Tu dominio del volumen es impresionante. " +
            "Has alcanzado un nivel matemático extraordinario.";

    }

    else if (gameScore >= 300) {

        finalTitle.textContent =
            "⚡ ¡SUPER SAIYAN!";

        finalText.textContent =
            "Muy buen entrenamiento. " +
            "Tu poder matemático sigue creciendo.";

    }

    else {

        finalTitle.textContent =
            "🥋 ¡SIGUE ENTRENANDO!";

        finalText.textContent =
            "Has completado el desafío. " +
            "Continúa practicando para aumentar tu poder.";

    }

}


/* =====================================================
   REINICIAR JUEGO
===================================================== */

restartGame.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        gameScore = 0;

        gameStreak = 0;

        gameKi = 0;


        gameScoreElement.textContent =
            "0";

        gameStreakElement.textContent =
            "0 🔥";

        kiBar.style.width =
            "0%";

        kiText.textContent =
            "0%";


        answerGrid.style.display =
            "grid";

        finalResult.style.display =
            "none";


        loadQuestion();

    }
);


/* =====================================================
   INICIAR EL MINIJUEGO
===================================================== */

loadQuestion();
