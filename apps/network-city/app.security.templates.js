angular.module("app.security.templates",[]).run(["$templateCache",$=>{$.put("app/security/login/view.authentication.pug",'\n<div class="loginbox" x-appear="x-appear">\n  <h1>&laquo;{{systemTitle}}&raquo;<small>{{\'LOGIN.Модуль_ПОО\' | translate}}</small></h1>\n  <form name="formAuth" novalidate="novalidate" x-ng-submit="authenticate(formAuth)" form-autofill-fix="form-autofill-fix">\n    <div class="login-error icon-warning" x-ng-show="formAuth.$invalid &amp;&amp; formAuth.$submitted">\n      <label x-ng-show="formAuth.login.$error.required || formAuth.password.$error.required">{{\'LOGIN.Введите_логин_и_пароль\' | translate}}</label>\n      <label x-ng-show="formAuth.$error.rest">{{ formAuth.$error.rest.message }}</label>\n    </div>\n    <div class="input-field input-field_user">\n      <input id="login" type="text" name="login" translate-attr="{placeholder : \'LOGIN.логин\'}" required="required" maxlength="16" autofocus="autofocus" x-ng-disabled="$busy" x-ng-model="credentials.login"/>\n    </div>\n    <div class="input-field input-field_password">\n      <input id="password" type="password" name="password" translate-attr="{placeholder : \'LOGIN.пароль\'}" required="required" x-ng-disabled="$busy" x-ng-model="credentials.password"/>\n    </div>\n    <button class="huge" id="loginButton" type="submit" x-ng-disabled="$busy">{{\'LOGIN.Войти\' | translate}}</button>\n    <div class="entrance-portal-wrapper">\n      <div x-ng-show="isEsiaAvailable"><a x-ng-click="loginWithEsia()">{{\'LOGIN.Войти_через_портал_гос_услуг\' | translate}}</a></div>\n    </div>\n    <p></p>\n    <div class="fclear" style="overflow:hidden">\n      <div class="fleft">\n        <label>\n          <input type="checkbox" ng-model="credentials.isRemember"/>&nbsp;{{\'LOGIN.Запомнить_меня\' | translate}}\n        </label>\n      </div>\n      <div class="fright"><a href="#/forgot">{{\'LOGIN.Забыли_свой_пароль\' | translate}}</a></div>\n    </div>\n  </form>\n  <div class="mtop">\n    <div class="copyright">{{\'LOGIN.АИС_разработана_АО\' | translate}} &laquo;ИРТех&raquo;, {{\'LOGIN.г_Самара\' | translate}}<br> &copy; 2013-2024, {{\'LOGIN.Все_права_защищены\' | translate}}<small x-ng-if="version">{{\'LOGIN.Версия\' | translate}} {{ version }}</small></div>\n  </div>\n</div>'),$.put("app/security/login/view.esia-error.pug",'\n<div class="loginbox" x-appear="x-appear">\n  <h1>&laquo;Сетевой город. Образование&raquo;<small>Модуль ПОО</small></h1>\n  <h4>Вход через портал гос. услуг</h4>\n  <div>\n    <p class="big">Возникла ошибка при входе через учетную запись ГосУслуг</p><br/><br/><a href="#/login">Вернуться на страницу входа в систему</a>\n  </div>\n  <div class="mtop">\n    <div class="copyright">АИС разработана АО &laquo;ИРТех&raquo;, г. Самара<br> &copy; 2013-2024, Все права защищены<small x-ng-if="version">Версия {{ version }}</small></div>\n  </div>\n</div>'),$.put("app/security/login/view.forgot-password.pug",'\n<div class="loginbox" x-appear="x-appear" x-ng-switch="params.isMessageSent">\n  <h1>&laquo;{{systemTitle}}&raquo;<small>Восстановление пароля</small></h1>\n  <div x-ng-switch-when="true">Запрос успешно отправлен. Проверьте вашу электронную почту и следуйте указанным в письме инструкциям по восстановлению пароля.</div>\n  <form name="formForgotPassword" novalidate="novalidate" form-autofill-fix="form-autofill-fix" x-ng-submit="submit(formForgotPassword)" x-ng-switch-default="x-ng-switch-default">\n    <div class="login-error icon-warning" x-ng-show="formForgotPassword.$invalid &amp;&amp; formForgotPassword.$submitted">\n      <label x-ng-show="formForgotPassword.email.$error.required">Введите ваш email адрес</label>\n      <label x-ng-show="formForgotPassword.email.$error.email">Неверный формат email адреса</label>\n      <label x-ng-show="formForgotPassword.$error.rest">{{ formForgotPassword.$error.rest.message }}</label>\n    </div>\n    <p>Введите адрес электронной почты вашей учётной записи. Вам будет отправлено письмо с инструкциями по восстановлению пароля.</p>\n    <div class="input-field input-field_email">\n      <input type="email" name="email" placeholder="Email адрес" required="required" maxlength="32" autofocus="autofocus" x-ng-disabled="$busy" x-ng-model="params.email"/>\n    </div>\n    <button class="huge" type="submit" x-ng-disabled="$busy">Отправить запрос</button>\n  </form>\n  <div class="copyright">АИС разработана АО &laquo;ИРТех&raquo;, г. Самара<br> &copy; 2013-2024, Все права защищены</div>\n</div>'),$.put("app/security/login/view.not-found.pug",'\n<div class="loginbox" x-appear="x-appear">\n  <h1>&laquo;Сетевой город. Образование&raquo;<small>Модуль ПОО</small></h1>\n  <h4>Вход через портал гос. услуг</h4>\n  <div>\n    <p class="big">С учётной записью портала гос. услуг не связан ни один пользователь системы</p><br/><br/><a href="#/login">Вернуться на страницу входа в систему</a>\n  </div>\n  <div class="mtop">\n    <div class="copyright">АИС разработана АО &laquo;ИРТех&raquo;, г. Самара<br> &copy; 2013-2024 Все права защищены<small x-ng-if="version">Версия {{ version }}</small></div>\n  </div>\n</div>'),$.put("app/security/login/view.reset-password.pug",'\n<div class="loginbox" x-ng-class="{appear: tenants !== null }" x-ng-switch="tenants | isEmpty">\n  <h1>&laquo;{{systemTitle}}&raquo;<small>Модуль ПОО</small></h1>\n  <div x-ng-switch-when="true">\n    <p>Извините, ваш запрос не может быть выполнен! Скорее всего, ссылка для изменения пароля устарела и уже недействительна, попробуйте отправить запрос ещё раз. Если это не поможет, свяжитесь с нашей службой поддержки.</p><a class="big" href="#/forgot">Отправить запрос на изменение пароля</a>\n  </div>\n  <form name="formResetPassword" novalidate="novalidate" x-ng-switch-default="x-ng-switch-default" x-ng-submit="submit(formResetPassword)">\n    <div class="login-error icon-warning" x-ng-show="formResetPassword.$invalid &amp;&amp; formResetPassword.$submitted">\n      <label x-ng-show="formResetPassword.password.$error.required || formResetPassword.confirmPassword.$error.required">Введите ваш новый пароль дважды</label>\n      <label x-ng-show="formResetPassword.password.$error.minlength &amp;&amp; !formResetPassword.confirmPassword.$error.required">Пароль должен быть не меньше 6 символов</label>\n      <label x-ng-show="formResetPassword.confirmPassword.$error.equals">Введенные вами пароли не совпадают</label>\n      <label x-ng-show="formResetPassword.$error.rest">{{ formResetPassword.$error.rest.message }}</label>\n    </div>\n    <p>Для изменения пароля вам нужно ввести его дважды, длина пароля должна быть не менее 6 символов. Обратите внимание, пароль будет изменён для входа во все образовательные организации, к которым вы имеете доступ.</p>\n    <div class="input-field input-field_password">\n      <input type="password" name="password" placeholder="Новый пароль" required="required" autofocus="autofocus" minlength="6" x-ng-disabled="$busy" x-ng-model="params.password"/>\n    </div>\n    <div class="input-field input-field_password">\n      <input type="password" name="confirmPassword" placeholder="Повторите пароль" required="required" x-ng-disabled="$busy" x-ng-model="params.confirmPassword" x-equals="params.password"/>\n    </div>\n    <button class="huge" type="submit" x-ng-disabled="$busy">Изменить пароль</button>\n    <h5 class="fgwhite">Вы имеете доступ к организациям:</h5>\n    <div class="access-list">\n      <ol>\n        <li x-ng-repeat="tenant in tenants">{{ tenant.settings.organization.shortName }}</li>\n      </ol>\n    </div>\n  </form>\n  <div class="copyright">АИС разработана АО &laquo;ИРТех&raquo;, г. Самара<br> &copy; 2013-2024, Все права защищены</div>\n</div>')}]);