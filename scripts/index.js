var conTypeBtn;
var orderBtn;
var hidePropertyBtn;
var drawingNode;
var diagramEvents = new DiagramClientSideEvents();
var dropDownDataSources = new DropDownDataSources();
var propertyChange = new PropertyChange();
var utilityMethods = new UtilityMethods();

window.onload = function()
{
    //diagram.fitToPage({ mode: 'page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });    
    document.onmouseover = menumouseover.bind(this);   
    zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
}

var ExportSettings = (function () {
    function ExportSettings() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }
    Object.defineProperty(ExportSettings.prototype, "fileName", {
        get: function () {
            return this.m_fileName;
        },
        set: function (fileName) {
            this.m_fileName = fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "format", {
        get: function () {
            return this.m_format;
        },
        set: function (format) {
            this.m_format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    return ExportSettings;
}());

var exportSettings = new ExportSettings();

var PrintSettings = (function () {
    function PrintSettings() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }
    Object.defineProperty(PrintSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageWidth", {
        get: function () {
            return this.m_pageWidth;
        },
        set: function (pageWidth) {
            this.m_pageWidth = pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageHeight", {
        get: function () {
            return this.m_pageHeight;
        },
        set: function (pageHeight) {
            this.m_pageHeight = pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isPortrait", {
        get: function () {
            return this.m_isPortrait;
        },
        set: function (isPortrait) {
            this.m_isPortrait = isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isLandscape", {
        get: function () {
            return this.m_isLandscape;
        },
        set: function (isLandscape) {
            this.m_isLandscape = isLandscape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "multiplePage", {
        get: function () {
            return this.m_multiplePage;
        },
        set: function (multiplePage) {
            this.m_multiplePage = multiplePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "paperSize", {
        get: function () {
            return this.m_paperSize;
        },
        set: function (paperSize) {
            this.m_paperSize = paperSize;
            document.getElementById('printCustomSize').style.display = 'none';
            document.getElementById('printOrientation').style.display = 'none';
            if (paperSize === 'Custom') {
                document.getElementById('printCustomSize').style.display = '';
            }
            else {
                document.getElementById('printOrientation').style.display = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return PrintSettings;
}());

var printSettings = new PrintSettings();

var PageSettings = (function () {
    function PageSettings() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
    return PageSettings;
}());

var pageSettings = new PageSettings();


function renameDiagram(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    var element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
}

function diagramNameKeyDown(args) {
    if (args.which === 13) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
}

function diagramNameChange(args) {
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
}

var btnFileMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getFileMenuItems(),
    content: 'File',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');


var btnSelectMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items:DropDownDataSources.prototype.getSelectMenuItems(),
    content: 'Select',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnSelectMenu.appendTo('#btnSelectMenu');



var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getViewMenuItems(),
    content: 'View',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnViewMenu.appendTo('#btnViewMenu');


function toolsContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnToolsMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}
function designContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnDesignMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}
function editContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnEditMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}

function arrangeMenuBeforeOpen(args)
{
    for (var i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = 'block';
    }
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

function arrangeMenuBeforeClose(args)
{
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}

function beforeItemRender(args) {
    var shortCutText = getShortCutKey(args.item.text);
    if (shortCutText) {
        var shortCutSpan = document.createElement('span');
        var text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = 'none';
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    var status = enableMenuItems(args.item.text, diagram);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}

function getShortCutKey(menuItem) {
    var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    switch (menuItem) {
        case 'New':
            shortCutKey = 'Shift' + '+N';
            break;
        case 'Open':
            shortCutKey = shortCutKey + '+O';
            break;
        case 'Save':
            shortCutKey = shortCutKey + '+S';
            break;
        case 'Undo':
            shortCutKey = shortCutKey + '+Z';
            break;
        case 'Redo':
            shortCutKey = shortCutKey + '+Y';
            break;
        case 'Cut':
            shortCutKey = shortCutKey + '+X';
            break;
        case 'Copy':
            shortCutKey = shortCutKey + '+C';
            break;
        case 'Paste':
            shortCutKey = shortCutKey + '+V';
            break;
        case 'Delete':
            shortCutKey = 'Delete';
            break;
        case 'Select All':
            shortCutKey = shortCutKey + '+A';
            break;
        case 'Zoom In':
            shortCutKey = shortCutKey + '++';
            break;
        case 'Zoom Out':
            shortCutKey = shortCutKey + '+-';
            break;
        default:
            shortCutKey = '';
            break;
    }
    return shortCutKey;
}

function enableMenuItems(itemText, diagram) {
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    if (itemText) {
        var commandType = itemText.replace(/[' ']/g, '');
        if (selectedItems.length === 0) {
            switch (commandType.toLowerCase()) {
                case 'cut':
                    return true;
                case 'copy':
                    return true;
                case 'delete':
                    return true;
            }
        }
        if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {
            return true;
        }
        if (itemText === 'Undo' && diagram.historyManager.undoStack.length<1) {
            return true;
        }
        if (itemText === 'Redo' && diagram.historyManager.redoStack.length<1) {
            return true;
        }
        if(itemText === 'Rotate Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Rotate Counter Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Send To Back' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring To Front' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring Forward' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Send Backward' && selectedItems.length === 0)
        {
            return true;
        }
    }
    return false;
};

function menumouseover(args) {
    var target = args.target;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        var button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            if(button1.element.id === 'btnEditMenu') {
                enableEditMenuItems(diagram);
            }
            var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
            buttonElement1.classList.add('e-btn-hover');
        }
    } else {
        if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
                buttonElement2.classList.remove('e-btn-hover');
            }
        }
    }
};


function enableEditMenuItems(diagram)
{
    var contextInstance = document.getElementById('editContextMenu');
    var contextMenu = contextInstance.ej2_instances[0];
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    for (var i = 0; i < contextMenu.items.length; i++) {
        contextMenu.enableItems([contextMenu.items[i].text], false);
    }
    var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
        if(objects.length>0)
        {
            contextMenu.enableItems(['Cut', 'Copy', 'Delete','Order Commands','Rotate']);
        }
        if(diagram.historyManager.undoStack.length>0){
            contextMenu.enableItems(['Undo']);
        }
        if(diagram.historyManager.redoStack.length>0){
            contextMenu.enableItems(['Redo']);
        }
        if((diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined)){
                contextMenu.enableItems(['Paste']);
            }  
}

    var disabledItems = ['Cut','Copy','Send To Back','Bring To Front','Delete'];
    var undoRedoItems = ['Undo','Redo'];
    var rotateItems = ['Rotate Clockwise','Rotate Counter Clockwise'];
    var pasteItem = ['Paste'];

    //Initialize Toolbar component
    var toolbarObj = new ej.navigations.Toolbar({
        clicked: function (args) { UtilityMethods.prototype.toolbarClick(args)},
        items: DropDownDataSources.prototype.toolbarItems(),
        width:'100%',
        overflowMode: 'Popup'
 });
 //Render initialized Toolbar component
 var items = [{ text: 'JPG' }, { text: 'PNG' }, { text: 'BMP' }, { text: 'SVG' }];
 var conTypeItems = [
                     {text: 'Straight',iconCss: 'sf-icon-straight_line'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                     {text: 'Bezier',iconCss: 'sf-icon-bezier'}
                    ];
var orderItems = [
    {text:'Bring Forward', iconCss:'sf-icon-bring-forward'},
    {text:'Bring To Front', iconCss:'sf-icon-bring-to-front'},
    {text:'Send Backward', iconCss:'sf-icon-send-backward'},
    {text:'Send To Back', iconCss:'sf-icon-send-to-back'},
]
var zoomMenuItems = [
    { text: 'Zoom Out' },{ text: 'Zoom In' },
     { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
                        { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
                        { text: 'Fit To Screen' }
                    ];
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss:'sf-icon-orthogonal_line',
    select: function (args) {UtilityMethods.prototype.onConnectorSelect(args)}
});
function enable()
{
    toolbarObj.items[18].disabled= false;
    toolbarObj.items[18].template= '';
    toolbarObj.dataBind();
}
function disable()
{
    toolbarObj.items[18].disabled= true;
    toolbarObj.items[18].template= '<div></div>';
    toolbarObj.dataBind();
}

function enableToolbarItems(selectedItems) {
    var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
    var toolbarClassName = 'db-toolbar-container';
    if (toolbarContainer.classList.contains('db-undo')) {
        toolbarClassName += ' db-undo';
    }
    if (toolbarContainer.classList.contains('db-redo')) {
        toolbarClassName += ' db-redo';
    }
    toolbarContainer.className = toolbarClassName;
    if (selectedItems.length === 1) {
        toolbarContainer.className = toolbarContainer.className + ' db-select';
        if (selectedItems[0] instanceof ej.diagrams.Node) {
            if (selectedItems[0].children) {
                if (selectedItems[0].children.length > 2) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                }
            }
            else {
                toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
            }
        }
    }
    else if (selectedItems.length === 2) {
        toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
    }
    else if (selectedItems.length > 2) {
        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
    }
    if (selectedItems.length > 1) {
        var isNodeExist = false;
        for (var i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i] instanceof ej.diagrams.Node) {
                toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                break;
            }
        }
    }
};

function multipleSelection()
{
    for(i=8;i<29;i++)
    {
        if(toolbarObj.items[i].type !=='Separator'){
            if(i !== 27 &&  i !== 28){
            toolbarObj.items[i].template= '';
            }
            if(i == 27 || i == 28)
            {
            toolbarObj.items[i].template= '<div></div>';
            }
        }
    }
}
var uploadObj = new ej.inputs.Uploader({
    asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    },
    success: onUploadSuccess,
    showFileList:false
});
uploadObj.appendTo('#fileupload');


 toolbarObj.appendTo('#toolbarEditor');
 var btnHideMenubar = new ej.buttons.Button({ iconCss: 'sf-icon-chevron-up' });
 conTypeBtn.appendTo('#conTypeBtn');
 btnHideMenubar.appendTo('#btnHideMenubar');
 hidePropertyBtn = new ej.buttons.Button({
     iconCss:'sf-icon-properties',isPrimary: true 
 });
 hidePropertyBtn.appendTo('#hideProperty');

function flipObjects(flipType)
{
    var selectedObjects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
 for(i=0;i<selectedObjects.length;i++)
 {
    selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
 }
 diagram.dataBind();
}

 
 function onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
    diagram.loadDiagram(event.target.result);
}

function lockObject (args) {
    for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
        var node = diagram.selectedItems.nodes[i];
        if (node.constraints & ej.diagrams.NodeConstraints.Drag) {
            node.constraints = ej.diagrams.NodeConstraints.PointerEvents | ej.diagrams.NodeConstraints.Select;
        } else {
            node.constraints = ej.diagrams.NodeConstraints.Default;
        }
    }
    for (var j = 0; j < diagram.selectedItems.connectors.length; j++) {
        var connector = diagram.selectedItems.connectors[j];
        if (connector.constraints & ej.diagrams.ConnectorConstraints.Drag) {
            connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select;
        } else {
            connector.constraints = ej.diagrams.ConnectorConstraints.Default;
        }
    }
    diagram.dataBind();
}

 function zoomChange(args){
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    if (args.item.text === 'Custom') {
        var ss = '';
    } else if (args.item.text === 'Fit To Screen') {
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = 'Fit ...';
        diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
    } else {
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom = {};
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case '400%':
                zoom.zoomFactor = (4 / currentZoom) - 1;
                break;
            case '300%':
                zoom.zoomFactor = (3 / currentZoom) - 1;
                break;
            case '200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                break;
            case '150%':
                zoom.zoomFactor = (1.5 / currentZoom) - 1;
                break;
            case '100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                break;
            case '75%':
                zoom.zoomFactor = (0.75 / currentZoom) - 1;
                break;
            case '50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                break;
            case '25%':
                zoom.zoomFactor = (0.25 / currentZoom) - 1;
                break;
        }
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = args.item.text;
        diagram.zoomTo(zoom);
    }
}

var PaperSize = (function () {
    function PaperSize() {
    }
    return PaperSize;
}());

//Create and add ports for node.
function getNodePorts(obj) {
    var ports = [
        { id: 'left', shape: 'Circle', offset: { x: 0, y: 0.5 } },
        { id: 'bottom', shape: 'Circle', offset: { x: 0.5, y: 1 } },
        { id: 'right', shape: 'Circle', offset: { x: 1, y: 0.5 } },
        { id: 'top', shape: 'Circle', offset: { x: 0.5, y: 0 } }
    ];
    return ports;
}
    diagram.appendTo('#diagram');

    var editContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: DropDownDataSources.prototype.getEditMenuItems(),
        onOpen: editContextMenuOpen,
        cssClass: "EditMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    })
    editContextMenu.appendTo('#editContextMenu');

    var designContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items:DropDownDataSources.prototype.getDesignMenuItems(),
        onOpen: designContextMenuOpen,
        cssClass: "DesignMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    })
    designContextMenu.appendTo('#designContextMenu');

    var toolsContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: DropDownDataSources.prototype.getToolsMenuItems(),
        onOpen: toolsContextMenuOpen,
        cssClass: "ToolsMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    });
    toolsContextMenu.appendTo('#toolsContextMenu');

    var btnDesignMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.designMenu',
        content: 'Design',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnDesignMenu.appendTo('#btnDesignMenu');
    var btnToolsMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.toolsMenu',
        content: 'Tools',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnToolsMenu.appendTo('#btnToolsMenu');

    var btnEditMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.editMenu',
        content: 'Edit',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
       beforeItemRender: beforeItemRender,
       beforeOpen: arrangeMenuBeforeOpen,
       beforeClose: arrangeMenuBeforeClose
    });
    btnEditMenu.appendTo('#btnEditMenu');

function minValue(){
    var size;
    if(diagram.selectedItems.nodes.length>0)
    {
      size =   diagram.selectedItems.nodes[0].annotations[0].style.fontSize;
    }
    else if(diagram.selectedItems.connectors.length>0){
        size =   diagram.selectedItems.connectors[0].annotations[0].style.fontSize;
    }
    return size;
}

    var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange });
    btnZoomIncrement.appendTo('#btnZoomIncrement');


var printDialog = new ej.popups.Dialog({
    width: '335px',
    header: 'Print Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('print'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="printDialogContent"><div class="row"><div class="row">Region</div> <div class="row db-dialog-child-prop-row">' +
    '<input type="text" id="printRegionDropdown"/> </div> </div><div class="row db-dialog-prop-row"><div class="row">Print Settings</div>' +
    '<div class="row db-dialog-child-prop-row"><input type="text" id="printPaperSizeDropdown"/> </div> </div>' +
    '<div id="printCustomSize" class="row db-dialog-prop-row" style="display:none; height: 28px;"> <div class="col-xs-6 db-col-left">' +
    '<div class="db-text-container"><div class="db-text"><span>W</span></div><div class="db-text-input"><input id="printPageWidth" type="text" />' +
    '</div> </div> </div> <div class="col-xs-6 db-col-right"><div class="db-text-container"> <div class="db-text"><span>H</span></div>' +
    '<div class="db-text-input"><input id="printPageHeight" type="text" /></div></div></div></div><div id="printOrientation" class="row db-dialog-prop-row" style="height: 28px; padding: 5px 0px;">' +
    '<div class="col-xs-3 db-prop-col-style" style="margin-right: 8px;"><input id="printPortrait" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
    '<input id="printLandscape" type="radio"></div></div> <div class="row db-dialog-prop-row" style="margin-top: 16px"> <input id="printMultiplePage" type="checkbox" /> </div> </div>'
});
printDialog.appendTo('#printDialog');

  // dropdown template for printDialog control
  var printRegionDropdown = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.region
});
printRegionDropdown.appendTo('#printRegionDropdown');

  // dropdown template for printDialog control
var printPaperSizeDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.paperList(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.paperSize
});
printPaperSizeDropdown.appendTo('#printPaperSizeDropdown');

// numerictextbox template for printDialog control
var printPageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageWidth
});
printPageWidth.appendTo('#printPageWidth');

// numerictextbox template for printDialog control
var printPageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageHeight
});
printPageHeight.appendTo('#printPageHeight');

// radiobutton template for printDialog control
var printPortrait = new ej.buttons.RadioButton({ label: 'Portrait', name: 'printSettings', checked: printSettings.isPortrait });
printPortrait.appendTo('#printPortrait');

// radiobutton template for printDialog control
var printLandscape = new ej.buttons.RadioButton({ label: 'Landscape', name: 'printSettings', checked: printSettings.isLandscape });
printLandscape.appendTo('#printLandscape');

// checkbox template for printDialog control
var printMultiplePage = new ej.buttons.CheckBox({ label: 'Scale to fit 1 page', checked: printSettings.multiplePage,
change: function (args) {multiplePage(args); }
});
printMultiplePage.appendTo('#printMultiplePage');

function multiplePage (args) {
    if (args.event) {
        printSettings.multiplePage = args.checked; 
    }
};

var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('export'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="exportDialogContent"><div class="row"><div class="row"> File Name </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportfileName" value = "Untitled Diagram"></div></div>' +
     '<div class="row db-dialog-prop-row"> <div class="col-xs-6 db-col-left"> <div class="row"> Format </div>' +
     '<div class="row db-dialog-child-prop-row"> <input type="text" id="exportFormat"/> </div> </div>' +
     '<div class="col-xs-6 db-col-right"> <div class="row"> Region </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportRegion"/></div></div></div></div>'
});
exportDialog.appendTo('#exportDialog');

var exportFormat = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format,
});
exportFormat.appendTo('#exportFormat');

  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');