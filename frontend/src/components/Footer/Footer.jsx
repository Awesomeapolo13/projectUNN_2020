'use strict'

import React from 'react';
import './style.css'

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <footer className={'footer'}>
                <div className={'footerInfo'}>
                    <ul className={'typesMenu'}>
                        <li>Роман</li>
                        <li>Повесть</li>
                    </ul>
                    <ul className={'typesMenu'}>
                        <li>Рассказ</li>
                        <li>Притча</li>
                    </ul>
                    <ul className={'typesMenu'}>
                        <li>Стихи</li>
                        <li>Комедия</li>
                    </ul>
                    <ul className={'typesMenu'}>
                        <li>Трагедия</li>
                        <li>Драма</li>
                    </ul>
                    <ul className={'typesMenu'}>
                        <li>Поэма</li>
                        <li>Балада</li>
                    </ul>
                </div>
                <div className={'footerRights'}>
                    <p>
                        Все материалы на портале защищены авторскими правами
                        и действующим законодательством. При частичном или полном копировании
                        любого материала, размещённого на сайте, необходимо
                        указывать активную ссылку на данный сайт в виде источника. Размещённые
                        фотографии и изображения принадлежат их правообладателям &copy; 2020
                    </p>
                </div>


            </footer>
            )

    }
}