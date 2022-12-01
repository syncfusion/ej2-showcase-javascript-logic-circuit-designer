var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents(){
    };
    DiagramClientSideEvents.prototype.selectionChange = function (args)
    {
        {
            if(args.state === 'Changed'){
                if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Connector){
                    diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All };
                }
                else{
                diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All & ~ej.diagrams.SelectorConstraints.Rotate & ~ej.diagrams.SelectorConstraints.ResizeAll };
                }
            }
        }
    };
    DiagramClientSideEvents.prototype.historyChange = function(args)
    {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    };
     return DiagramClientSideEvents;
}());