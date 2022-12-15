var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents(){
    };
    DiagramClientSideEvents.prototype.selectionChange = function (args)
    {
        {
            if(args.state === 'Changed'){
                var selectedItems = diagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
                enableToolbarItems(selectedItems);
                if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Connector){
                    diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All };
                    toolbarObj.hideItem(6,true);
                    toolbarObj.items[7].template = '<div style="margin-left:1000px;"></div>';
                }
                else{
                    if(diagram.selectedItems.nodes.length > 0 &&
                         diagram.selectedItems.nodes[0].id.indexOf('Clock') != -1)
                    {
                        toolbarObj.hideItem(6,false);
                        toolbarObj.items[7].template = '<div style="margin-left:900px;"></div>';
                    }
                    else
                    {
                        toolbarObj.hideItem(6,true);
                        toolbarObj.items[7].template = '<div style="margin-left:1000px;"></div>';
                    }
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