// --
// Copyright (C) 2001-2016 OTRS AG, http://otrs.com/
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var Core = Core || {};
Core.Agent = Core.Agent || {};
Core.Agent.Admin = Core.Agent.Admin || {};

/**
 * @namespace Core.Agent.Admin.GenericInterfaceOperation
 * @memberof Core.Agent.Admin
 * @author OTRS AG
 * @description
 *      This namespace contains the special module functions for the GenericInterface debugger module.
 */
Core.Agent.Admin.GenericInterfaceOperation = (function (TargetNS) {

    /**
     * @name Init
     * @memberof Core.Agent.Admin.GenericInterfaceOperation
     * @function
     * @description
     *      This function initialize the module functionality.
     */
    TargetNS.Init = function () {

        TargetNS.WebserviceID = parseInt(Core.Config.Get('WebserviceID'), 10);
        TargetNS.Operation = Core.Config.Get('Operation');
        TargetNS.Action = 'AdminGenericInterfaceOperationDefault';

        // Bind event to Inbound configure button
        $('#MappingInboundConfigureButton').on('click', function(){
            var URL;

            if ($('#MappingInboundConfigDialog').val()) {
                URL = Core.Config.Get('Baselink') + 'Action=' + $('#MappingInboundConfigDialog').val();
                URL += ';Subaction=Change;Operation=' + $('#OldOperation').val() + ';Direction=MappingInbound' + ';WebserviceID=' + $('#WebserviceID').val() ;
                window.location.href = URL;
            }
        });

        // Bind event to Outbound configure button
        $('#MappingOutboundConfigureButton').on('click', function(){
            var URL;

            if ($('#MappingOutboundConfigDialog').val()) {
                URL = Core.Config.Get('Baselink') + 'Action=' + $('#MappingOutboundConfigDialog').val();
                URL += ';Subaction=Change;Operation=' + $('#OldOperation').val() + ';Direction=MappingOutbound' + ';WebserviceID=' + $('#WebserviceID').val();
                window.location.href = URL;
            }
        });

        // Bind event to Save and Finish button
        $('#SaveAndFinishButton').on('click', function(){
            $('#ReturnToWebservice').val(1);
        });

        // Bind event to Name field
        $('.RegisterChange').on('change.RegisterChange keyup.RegisterChange', function () {
            $('.HideOnChange').hide();
            $('.ShowOnChange').show();
        });

        // Bind event to Delete button
        $('#DeleteButton').on('click', TargetNS.ShowDeleteDialog);
    };

    /**
     * @name ShowDeleteDialog
     * @memberof Core.Agent.Admin.GenericInterfaceOperation
     * @function
     * @param {Object} Event - The browser event object, e.g. of the clicked DOM element.
     * @description
     *      Shows a confirmation dialog to delete the operation.
     */
    TargetNS.ShowDeleteDialog = function(Event){
        Core.UI.Dialog.ShowContentDialog(
            $('#DeleteDialogContainer'),
            Core.Language.Translate('Delete this Operation'),
            '240px',
            'Center',
            true,
            [
               {
                   Label: Core.Language.Translate('Cancel'),
                   Class: 'Primary',
                   Function: function () {
                       Core.UI.Dialog.CloseDialog($('#DeleteDialog'));
                   }
               },
               {
                   Label: Core.Language.Translate('Delete'),
                   Function: function () {
                       var Data = {
                            Action: TargetNS.Action,
                            Subaction: 'DeleteAction',
                            WebserviceID: TargetNS.WebserviceID,
                            Operation: TargetNS.Operation
                        };

                        Core.AJAX.FunctionCall(Core.Config.Get('CGIHandle'), Data, function (Response) {
                            if (!Response || !Response.Success) {
                                alert(Core.Language.Translate('An error occurred during communication.'));
                                return;
                            }

                            Core.App.InternalRedirect({
                                Action: 'AdminGenericInterfaceWebservice',
                                Subaction: 'Change',
                                WebserviceID: TargetNS.WebserviceID
                            });

                        }, 'json');

                       Core.UI.Dialog.CloseDialog($('#DeleteDialog'));
                   }
               }
           ]
        );

        Event.stopPropagation();
    };

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.Admin.GenericInterfaceOperation || {}));
