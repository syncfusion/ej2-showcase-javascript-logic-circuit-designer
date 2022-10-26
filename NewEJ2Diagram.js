
var orData = 'M21.7,76.5L21.7,76.5c6.4-18.1,6.4-37.8,0-55.9l0-0.1h1.6c21.5,0,41.7,10.4,54.2,28l0,0l0,0  c-12.5,17.6-32.7,28-54.2,28H21.7z M99.5,48.5l-22,0 M0,31.5h25 M0,65.5h25';
var andData = 'M21.5,20.5h28a28,28,0,0,1,28,28v0a28,28,0,0,1-28,28h-28a0,0,0,0,1,0,0v-56a0,0,0,0,1,0,0Z M78,48.5 L 100,48.5Z M0,32.5 L 21.4,32.5Z M0,65.5 L 21.4,65.5Z';
var notData = 'M75.5,50.5l-52,28v-56L75.5,50.5z M81.5,50.5h18 M1.5,50.5h22 M78.5,47.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3  S80.2,47.5,78.5,47.5z';
var xorData = 'M21.7,76.5L21.7,76.5c6.4-18.1,6.4-37.8,0-55.9l0-0.1h1.6c21.5,0,41.7,10.4,54.2,28l0,0l0,0  c-12.5,17.6-32.7,28-54.2,28H21.7z M73.4,48.5L73.4,48.5 M17.5,76.8L17.5,76.8c6.7-18.2,6.7-38.1,0-56.3l0-0.1 M77.5,48.5h22   M0,32.5h21 M0,65.5h21';

var orPort = 
[
    { id: 'Or_port1', offset: { x: 0.01, y: 0.1963 } }, { id: 'Or_port2', offset: { x: 0.26, y: 0.5 } },
    { id: 'Or_port3', offset: { x: 0.01, y: 0.805 } }, { id: 'Or_port4', offset: { x: 0.99, y: 0.5 } }
];

var andPort = 
[
    { id: 'And_port1', offset: { x: 0.01, y: 0.215 } }, { id: 'And_port2', offset: { x: 0.22, y: 0.5 } },
    { id: 'And_port3', offset: { x: 0.01, y: 0.805 } }, { id: 'And_port4', offset: { x: 0.99, y: 0.5 } }
];

var notPort = 
[
    { id: 'Not_port1', offset: { x: 0.01, y: 0.5 } }, { id: 'Not_port2', offset: { x: 0.99, y: 0.5 } }
];

var flipPorts = [{ offset: { x: 0.01, y: 0.221 } }, { offset: { x: 0.01, y: 0.779 } }, { offset: { x: 0.99, y: 0.221 } }, { offset: { x: 0.99, y: 0.779 } }];
var jkPorts = [{ offset: { x: 0.01, y: 0.270 } }, { offset: { x: 0.01, y: 0.5 } }, { offset: { x: 0.01, y: 0.720 } }, { offset: { x: 0.99, y: 0.270 } }, { offset: { x: 0.99, y: 0.720 } }, { offset: { x: 0.5, y: 0.01 } }, { offset: { x: 0.5, y: 0.99 } }];
var rPorts = [{ offset: { x: 0.01, y: 0.210 } }, { offset: { x: 0.01, y: 0.778 } }, { offset: { x: 0.5, y: 0.218 } }, { offset: { x: 0.99, y: 0.210 } }, { offset: { x: 0.99, y: 0.778 } }];

var gates = 
[
    { 
        id: 'Or', shape: { type: 'Path', data: orData }, ports: orPort 
    },

    {
        id: 'Nor',
        shape: { type: 'Path', data: 'M21.7,76.5L21.7,76.5c6.4-18.1,6.4-37.8,0-55.9l0-0.1h1.6c21.5,0,41.7,10.4,54.2,28l0,0l0,0  c-12.5,17.6-32.7,28-54.2,28H21.7z M83.5,48.5h16 M1.5,32.5h24 M1.5,64.5h24 M80.5,45.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3  S82.2,45.5,80.5,45.5z' }
    },

    { 
        id: 'And', shape: { type: 'Path', data: andData }, ports: andPort 
    },

    {
        id: 'Nand',
        shape: { type: 'Path', data: 'M49.5,76.5h-28v-56h28c15.5,0,28,12.5,28,28v0C77.5,64,65,76.5,49.5,76.5z M83.5,48.5h16 M1.5,32.5h20   M1.5,65.5h20 M80.5,45.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S82.2,45.5,80.5,45.5z' }
    },

    { 
        id: 'not', shape: { type: 'Path', data: notData }, ports: notPort 
    },

    {
        id: 'Buffer', ports: [{ offset: { x: 0.01, y: 0.5 } }, { offset: { x: 0.99, y: 0.5 } }],
        shape: { type: 'Path', data: 'M170.354,66.6523000000002L199.753,83.6253000000002L170.354,100.5983L170.354,66.6523000000002zM199.7534,83.6255000000001L214.5004,83.6255000000001M154.5,83.6255000000001L170.354,83.6255000000001' },
    },

    {
        id: 'XorGate', ports: orPort,
        shape: { type: 'Path', data: 'M21.7,76.5L21.7,76.5c6.4-18.1,6.4-37.8,0-55.9l0-0.1h1.6c21.5,0,41.7,10.4,54.2,28l0,0l0,0  c-12.5,17.6-32.7,28-54.2,28H21.7z M73.4,48.5L73.4,48.5 M17.5,76.8L17.5,76.8c6.7-18.2,6.7-38.1,0-56.3l0-0.1 M77.5,48.5h22   M0,32.5h21 M0,65.5h21' }
    },
];

var flipflops = 
[
    {
        id: 'JKflipflop', ports: jkPorts,
        shape: { type: 'Path', data: 'M22.5,14.5h56v72h-56V14.5z M28.9,31.4c0,0.4-0.1,0.7-0.3,1s-0.5,0.4-0.9,0.4c-0.4,0-0.8-0.1-1-0.3  s-0.3-0.6-0.3-1h-0.9c0,0.7,0.2,1.2,0.6,1.5c0.4,0.3,0.9,0.5,1.6,0.5c0.6,0,1.2-0.2,1.6-0.5s0.6-0.9,0.6-1.5v-5.1h-0.9V31.4z   M30.4,73.4h1.1l-3-3.7l2.8-3.4h-1l-2.6,3.2H27v-3.2H26v7.1H27v-3.2h0.9L30.4,73.4z M74.5,29.2c0-0.9-0.3-1.6-0.8-2.2  c-0.5-0.6-1.2-0.9-2.1-0.9c-0.8,0-1.5,0.3-2,0.9s-0.8,1.3-0.8,2.2v1.3c0,0.9,0.3,1.6,0.8,2.2s1.2,0.9,2,0.9c0.2,0,0.3,0,0.5,0  c0.2,0,0.3-0.1,0.5-0.1l1.3,1.2l0.6-0.6l-1.2-1.1c0.4-0.3,0.7-0.6,0.9-1.1s0.3-0.9,0.3-1.4V29.2z M73.6,30.4c0,0.7-0.2,1.2-0.5,1.6  c-0.4,0.4-0.8,0.6-1.5,0.6c-0.6,0-1-0.2-1.4-0.6c-0.3-0.4-0.5-1-0.5-1.6v-1.3c0-0.7,0.2-1.2,0.5-1.6c0.3-0.4,0.8-0.6,1.4-0.6  c0.6,0,1.1,0.2,1.5,0.6s0.5,1,0.5,1.6V30.4z M74.5,70.2c0-0.9-0.3-1.6-0.8-2.2c-0.5-0.6-1.2-0.9-2.1-0.9c-0.8,0-1.5,0.3-2,0.9  s-0.8,1.3-0.8,2.2v1.3c0,0.9,0.3,1.6,0.8,2.2s1.2,0.9,2,0.9c0.2,0,0.3,0,0.5,0c0.2,0,0.3-0.1,0.5-0.1l1.3,1.2l0.6-0.6l-1.2-1.1  c0.4-0.3,0.7-0.6,0.9-1.1s0.3-0.9,0.3-1.4V70.2z M73.6,71.4c0,0.7-0.2,1.2-0.5,1.6c-0.4,0.4-0.8,0.6-1.5,0.6c-0.6,0-1-0.2-1.4-0.6  c-0.3-0.4-0.5-1-0.5-1.6v-1.3c0-0.7,0.2-1.2,0.5-1.6c0.3-0.4,0.8-0.6,1.4-0.6c0.6,0,1.1,0.2,1.5,0.6s0.5,1,0.5,1.6V71.4z M50.7,80.3  c0.4,0,0.7,0.1,0.9,0.3s0.3,0.5,0.3,0.9v0.6c0,0.2,0,0.4,0.1,0.7s0.1,0.4,0.2,0.5h0.9v-0.1c-0.1-0.1-0.2-0.3-0.3-0.4  s-0.1-0.4-0.1-0.6v-0.7c0-0.4-0.1-0.8-0.3-1.1c-0.2-0.3-0.5-0.5-0.9-0.6c0.4-0.2,0.7-0.4,0.9-0.6c0.2-0.3,0.3-0.6,0.3-1  c0-0.7-0.2-1.2-0.6-1.5c-0.4-0.3-1-0.5-1.8-0.5H48v7.1h0.9v-3.1H50.7z M48.9,77h1.6c0.5,0,0.9,0.1,1.1,0.3s0.4,0.5,0.4,0.9  c0,0.4-0.1,0.8-0.4,1c-0.2,0.2-0.6,0.3-1.2,0.3h-1.6V77z M51.5,23.4c-0.3,0.2-0.7,0.3-1.2,0.3c-0.5,0-0.9-0.1-1.3-0.4  c-0.3-0.2-0.5-0.6-0.5-1.1h-0.9c0,0.7,0.3,1.2,0.8,1.6c0.5,0.4,1.2,0.6,1.9,0.6c0.8,0,1.4-0.2,1.8-0.5c0.5-0.3,0.7-0.8,0.7-1.4  c0-0.5-0.2-1-0.6-1.3c-0.4-0.4-1-0.6-1.7-0.8c-0.7-0.2-1.1-0.3-1.4-0.5c-0.3-0.2-0.4-0.5-0.4-0.8c0-0.4,0.1-0.6,0.4-0.9  s0.6-0.3,1.1-0.3c0.5,0,0.9,0.1,1.2,0.4s0.4,0.6,0.4,1h0.9c0-0.6-0.2-1.1-0.7-1.5s-1.1-0.6-1.9-0.6c-0.7,0-1.3,0.2-1.8,0.5  c-0.4,0.4-0.7,0.8-0.7,1.4c0,0.5,0.2,1,0.6,1.3s1,0.6,1.8,0.8c0.6,0.2,1.1,0.3,1.3,0.6s0.4,0.5,0.4,0.8  C51.9,22.9,51.8,23.2,51.5,23.4z M78.5,29.5h20 M78.5,70.5h20 M2.5,29.5h20 M2.5,70.5h20 M68.5,65.5h6 M2.5,50.5h20 M31.9,51.5  l-9.4-4.7v9.4L31.9,51.5z M50.5,14.5v-10 M50.5,96.5v-10' }
    },

    {
        id: 'Dflipflop', ports: flipPorts,
        shape: { type: 'Path', data: 'M21.2,13.5h57v73h-57V13.5z M78.2,29.5h20 M78.2,70.5h20 M1.2,29.5h20 M1.2,70.5h20 M26.6,33.4  c0.6,0,1.2-0.1,1.7-0.4c0.5-0.3,0.8-0.7,1.1-1.2c0.3-0.5,0.4-1.1,0.4-1.8v-0.5c0-0.7-0.1-1.2-0.4-1.7c-0.3-0.5-0.6-0.9-1.1-1.2  s-1-0.4-1.6-0.4h-2v7.1H26.6z M26.7,27c0.7,0,1.2,0.2,1.6,0.7c0.4,0.4,0.6,1.1,0.6,1.9V30c0,0.8-0.2,1.5-0.6,1.9  c-0.4,0.4-1,0.7-1.7,0.7h-1V27H26.7z M48.9,56.6c1,0,1.9-0.2,2.7-0.7c0.8-0.4,1.4-1.1,1.8-1.9c0.4-0.8,0.6-1.8,0.6-2.8v-0.6  c0-1.1-0.2-2-0.6-2.8c-0.4-0.8-1-1.5-1.8-1.9c-0.8-0.4-1.7-0.7-2.7-0.7h-3.4v11.4H48.9z M48.9,46.8c1,0,1.8,0.3,2.3,1  c0.5,0.7,0.8,1.6,0.8,2.8v0.6c0,1.2-0.3,2.1-0.8,2.8s-1.4,1-2.4,1h-1.3v-8.2H48.9z M74.1,29.6c0-0.7-0.1-1.3-0.4-1.8s-0.6-0.9-1-1.2  c-0.4-0.3-0.9-0.4-1.5-0.4c-0.6,0-1.1,0.1-1.5,0.4c-0.4,0.3-0.8,0.7-1,1.2s-0.4,1.1-0.4,1.8v0.5c0,0.7,0.1,1.3,0.4,1.8  c0.2,0.5,0.6,0.9,1,1.2s0.9,0.4,1.5,0.4c0.3,0,0.5,0,0.7-0.1l1.5,1.2l0.6-0.6l-1.3-1c0.4-0.3,0.7-0.7,0.9-1.2s0.3-1.1,0.3-1.8V29.6z   M73.1,30.1c0,0.8-0.2,1.5-0.5,1.9s-0.8,0.7-1.4,0.7s-1.1-0.2-1.4-0.7c-0.3-0.5-0.5-1.1-0.5-1.9v-0.5c0-0.8,0.2-1.4,0.5-1.9  c0.3-0.5,0.8-0.7,1.4-0.7c0.6,0,1.1,0.2,1.4,0.7c0.3,0.5,0.5,1.1,0.5,1.9V30.1z M74.1,70.6c0-0.7-0.1-1.3-0.4-1.8s-0.6-0.9-1-1.2  c-0.4-0.3-0.9-0.4-1.5-0.4c-0.6,0-1.1,0.1-1.5,0.4c-0.4,0.3-0.8,0.7-1,1.2s-0.4,1.1-0.4,1.8v0.5c0,0.7,0.1,1.3,0.4,1.8  c0.2,0.5,0.6,0.9,1,1.2s0.9,0.4,1.5,0.4c0.3,0,0.5,0,0.7-0.1l1.5,1.2l0.6-0.6l-1.3-1c0.4-0.3,0.7-0.7,0.9-1.2s0.3-1.1,0.3-1.8V70.6z   M73.1,71.1c0,0.8-0.2,1.5-0.5,1.9s-0.8,0.7-1.4,0.7s-1.1-0.2-1.4-0.7c-0.3-0.5-0.5-1.1-0.5-1.9v-0.5c0-0.8,0.2-1.4,0.5-1.9  c0.3-0.5,0.8-0.7,1.4-0.7c0.6,0,1.1,0.2,1.4,0.7c0.3,0.5,0.5,1.1,0.5,1.9V71.1z M68.2,65.5h6 M31.2,70.5l-10-5v10L31.2,70.5z' }
    },
];

var palette = new ej.diagrams.SymbolPalette({
    expandMode: 'Multiple',
    palettes: 
    [
        { id: 'flow', expanded: true, symbols: gates, title: 'Logic Gates' },
        { id: 'flipflop', expanded: true, symbols: flipflops, title: 'Flip flops' },
    ],
    width: '100%', height: '100%',
    symbolMargin: { left: 10, right: 10, top: 10, bottom: 10 },
    symbolHeight: 60, symbolWidth: 62,
    getNodeDefaults: function (symbol) 
    {
        symbol.width = 55;
        symbol.height = 40;
        symbol.offsetX = 20;
        symbol.offsetY = 20;
        symbol.style = { fill: 'white', strokeWidth: 1, strokeColor: '#757575' };
    },
    symbolPreview: { height: 50, width: 50 },
    getSymbolInfo: function () 
    {
        return { fit: true };
    }
});
palette.appendTo('#element');


function createNode(id, offsetX, offsetY, height,width, pathData, ports) 
{
    var node = {};
    node.id = id;
    node.offsetX = offsetX;
    node.offsetY = offsetY;
    node.height = height;
    node.width = width;
    node.shape = { type: 'Path', data: pathData };
    node.ports = ports;
    return node;
}

function createConnector(id, sourcePoint, targetPoint, sourceID, targetID, sourcePortID, targetPortID, sourceDecorator, targetDecorator) 
{
    var connector = {};
    connector.id = id;
    if (sourcePoint) 
    {
        connector.sourcePoint = { x: sourcePoint.x, y: sourcePoint.y - nodeY };
    }
    if (targetPoint) 
    {
        connector.targetPoint = { x: targetPoint.x, y: targetPoint.y - nodeY };
    }
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    connector.type = 'Bezier';
    connector.sourcePortID = sourcePortID;
    connector.targetPortID = targetPortID;
    connector.sourceDecorator = sourceDecorator;
    connector.targetDecorator = targetDecorator;
    return connector;
}

var nodes = 
[
    createNode('OR1', 250, 370, 60, 100, orData, orPort),
    createNode('And1', 250, 170, 60,100, andData, andPort),
    createNode('And2', 250, 570, 60,100, andData, andPort),
    createNode('And3', 450, 450, 60,100, andData, andPort),
    createNode('OR2', 650, 370, 60, 100, orData, orPort),
    createNode('Not1',650,530,60,100, notData, notPort),
    createNode('XOR1',850,450,60,100, xorData,orPort),
];

var decorator = 
{
    height: 12, width: 12, shape: 'Circle', style: { fill: 'white', strokeColor: '#444', strokeWidth: 1 }
};

var connectors =
[
    createConnector('con1',null,null,'And1','OR2','And_port4','Or_port1',decorator,null),
    createConnector('con2',null,null,'OR1','And3','Or_port4','And_port1',decorator,null),
    createConnector('con3',null,null,'And2','And3','And_port4','And_port3',decorator,null),
    createConnector('con4',null,null,'And3','OR2','And_port4','Or_port3',decorator,null),
    createConnector('con5',null,null,'OR2','XOR1','Or_port4','Or_port1',decorator,null),
    createConnector('con6',null,null,'Not1','XOR1','Not_port2','Or_port3',decorator,null),
];

var diagram = new ej.diagrams.Diagram({ width: '100%', height: '900px', nodes: nodes , connectors: connectors });

diagram.appendTo('#diagram');

function undo() {
    diagram.isModified = true;
    diagram.undo();
}