window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Casa',
            location: {
                lat: 5.046976,
                lng: -75.481960,
            }
        },
        {
            name: 'Cable',
            location: {
                lat: 5.055881,
                lng: -75.486040,
            }
        },
        {
            name: 'David',
            location: {
                lat: 4.86225,
                lng: -74.0646,
            }
        },
        {
            name: 'David2',
            location: {
                lat: 4.86153,
                lng: -74.06538,
            }
        },
    ];
}

var models = [
    {
        url: './assets/ChristmasTree.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Feliz Navidad',
        rotation: '0 0 0',
        position: '0 -2 5',
    },
];

var modelIndex = 0;

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
