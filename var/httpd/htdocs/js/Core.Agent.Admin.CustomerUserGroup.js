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
 * @namespace Core.Agent.Admin.CustomerUserGroup
 * @memberof Core.Agent.Admin
 * @author OTRS AG
 * @description
 *      This namespace contains the special module function for CustomerUserGroup selection.
 */
 Core.Agent.Admin.CustomerUserGroup = (function (TargetNS) {

    /*
    * @name Init
    * @memberof Core.Agent.Admin.CustomerUserGroup
    * @function
    * @description
    *      This function initializes filter and "SelectAll" actions.
    */
    TargetNS.Init = function () {
        var RelationItems = Core.Config.Get('RelationItems');

        // initialize "SelectAll" checkbox and bind click event on "SelectAll" for each relation item
        if (RelationItems) {
            $.each(RelationItems, function (index) {
                Core.Form.InitSelectAllCheckboxes($('table td input[type="checkbox"][name=' + RelationItems[index] + ']'), $('#SelectAll' + RelationItems[index]));

                $('input[type="checkbox"][name=' + RelationItems[index] + ']').click(function () {
                    Core.Form.SelectAllCheckboxes($(this), $('#SelectAll' + RelationItems[index]));
                });
            });
        }

        // initialize table filter
        Core.UI.Table.InitTableFilter($("#FilterGroups"), $("#Group"));
    };

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.Admin.CustomerUserGroup || {}));