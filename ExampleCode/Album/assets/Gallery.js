var Resource = {
    container: null,
    elements: [],
    init: function () {
        this.container = document.getElementById('loader-container');
    },
    load: function (resource, cb) {
        function done() {
            Resource.container.classList.add('status-loaded');
            setTimeout(cb.bind(null, Resource.elements), 2600);
        }

        var count = resource.length;
        var current = Date.now();

        function success(element) {
            var end = Date.now();
            var delta = end - current;
            if (delta < 70) {
                return setTimeout(success.bind(Resource, element), delta);
            }
            current = end;

            var x = Math.random() * 1260 - 630;
            var y = Math.random() * 600 - 300;
            var z = Math.random() * 1500;
            var elements = this.elements;
            elements.push(element);
            this.container.appendChild(element);

            setTimeout(function () {
                var value = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
                element.style.WebkitTransform = value;
                element.style.MozTransform = value;
                element.style.transform = value;
                element.style.opacity = 1;

                --count === 0 && done();
            }, Math.round(Math.random() * 1000));
        }

        function error() {
            --count === 0 && done();
        }

        for (var i = resource.length - 1; i > -1; --i) {
            var element = document.createElement('div');
            element.className = 'element';
            element.style.opacity = 0;
            element.setAttribute('data-index', i);
            element.appendChild(this.addImage(element, resource[i], success.bind(this, element, i), error.bind(this)));
        }
    },

    addImage: function (parent, src, cb) {
        var img = new Image();
        img.onload = function () {
            img.onload = img.onerror = null;
            cb();
        };

        img.onerror = function () {
            parent.parentNode && parent.parentNode.removeChild(parent);
            img.onload = img.onerror = null;
            cb();
        };

        img.src = src;

        return img;
    }
};

var Gallery = {
    camera: null,
    scene: null,
    renderer: null,
    objects: [],
    container: null,
    targets: {heart: [], sphere: [], helix: [], grid: []},
    init: function (resource) {
        Resource.init();
        Resource.load(resource, function (elements) {
            Gallery.elemens = elements;
            Gallery.initObjects();
            Gallery.initEvents();
            Gallery.initShape();
            Gallery.objects.forEach(function (object) {this.scene.add(object);}, Gallery);
            Gallery.run();
        });
        Gallery.initThree();
        Gallery.initRenderer();
        Gallery.initControls();
    },

    initThree: function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 3000;
    },

    initRenderer: function () {
        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.position = 'absolute';
        document.getElementById('container').appendChild(this.renderer.domElement);
    },

    initControls: function () {
        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 8000;
    },

    initObjects: function () {
        this.elemens.forEach(function (element) {
            var object = new THREE.CSS3DObject(element);
            var x = object.position.x = Math.random() * 4000 - 2000;
            var y = object.position.y = Math.random() * 4000 - 2000;
            var z = object.position.z = Math.random() * 4000 - 2000;
            this.objects.push(object);
            element.style.transform = 'translate3d(' + x / 2 + 'px,' + (y / 2 - 300) + 'px,' + z + 'px)';
        }, this);
    },

    initEvents: function () {
        this.controls.addEventListener('change', this.render.bind(this));
        var onResize = function () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);

        };
        window.addEventListener('resize', onResize.bind(this), false);

    },

    initShape: function () {
        for (var i = this.objects.length - 1; i > -1; --i) {
            this.addHeart(i);
            this.addSphere(i);
            this.addHelix(i);
            this.addGrid(i);
        }
    },

    run: function () {
        this.animate();
        var display = ['grid', 'helix', 'sphere', 'heart'];
        var cursor = 0;
        var me = this;

        function slide() {
            me.transform(me.targets[display[cursor]], 2000);
            cursor = (cursor + 1) % 4;
            setTimeout(arguments.callee, 4500);
        }

        slide();
    },

    animate: function () {
        requestAnimationFrame(this.animate.bind(this));
        TWEEN.update();
        this.controls.update();
    },

    transform: function (targets, duration) {

        TWEEN.removeAll();

        for (var i = 0; i < this.objects.length; i++) {

            var object = this.objects[i];
            var target = targets[i];

            new TWEEN.Tween(object.position)
                .to({x: target.position.x, y: target.position.y, z: target.position.z}, Math.random() * duration
                + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

            new TWEEN.Tween(object.rotation)
                .to({x: target.rotation.x, y: target.rotation.y, z: target.rotation.z}, Math.random() * duration
                + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }

        new TWEEN.Tween(this).to({}, duration * 2).onUpdate(this.render.bind(this)).start();
    },

    addHeart: function (index) {
        var object = new THREE.Object3D();
        var delta = 2 * Math.PI / this.objects.length;
        var theta = index * delta;
        object.position.x = 60 * 16 * Math.pow(Math.sin(theta), 3);
        object.position.y = 200 +
        60 * (13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
        this.targets.heart.push(object);
    },

    addSphere: function (index) {
        var vector = new THREE.Vector3();
        var phi = Math.acos(-1 + ( 2 * index ) / this.objects.length);
        var theta = Math.sqrt(this.objects.length * Math.PI) * phi;

        var object = new THREE.Object3D();

        object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
        object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
        object.position.z = 800 * Math.cos(phi);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        this.targets.sphere.push(object);
    },

    addHelix: function (index) {
        var vector = new THREE.Vector3();
        var phi = index * 0.175 + Math.PI;

        var object = new THREE.Object3D();

        object.position.x = 1000 * Math.sin(phi);
        object.position.y = -( index * 7 ) + 400;
        object.position.z = 1000 * Math.cos(phi);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        this.targets.helix.push(object);

    },

    addGrid: function (index) {
        var object = new THREE.Object3D();
        object.position.x = ( ( index % 5 ) * 400 ) - 800;
        object.position.y = ( -( Math.floor(index / 5) % 5 ) * 400 ) + 800;
        object.position.z = ( Math.floor(index / 25) ) * 1000 - 1000;

        this.targets.grid.push(object);
    },

    render: function () {
        this.renderer.render(this.scene, this.camera);
    }
};