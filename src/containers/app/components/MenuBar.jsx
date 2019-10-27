import React from 'react';
import '../styles/MenuBar.scss';
import classnames from 'classnames';

const menu = [
  { id: 'init', icon: 'home', label: 'Inicio' },
  { id: 'favorite', icon: 'favorite', label: 'otro' },
  { id: 'info', icon: 'info', label: 'Información' },
];
export default function MenuBar({ tab, handleChange }) {
  const defaultClass =        'mdc-bottom-navigation__list-item mdc-ripple-surface mdc-ripple-surface--primary';
  const activatedClass = 'mdc-bottom-navigation__list-item--activated';

  return (
      <div className="MenuBar">
          <div className="mdc-bottom-navigation">
              <nav className="mdc-bottom-navigation__list">
                  {menu.map((item, index) => (
                      <span
                          key={`menu-${item.id}`}
                          className={classnames(defaultClass, {
                              [activatedClass]: tab === index,
                            })}
                          data-mdc-auto-init="MDCRipple"
                          data-mdc-ripple-is-unbounded
                          onClick={() => handleChange(index)}
                        >
                          <span className="material-icons mdc-bottom-navigation__list-item__icon">
                              {item.icon}
                            </span>
                          <span className="mdc-bottom-navigation__list-item__text">
                              {item.label}
                            </span>
                        </span>
                    ))}
                </nav>
            </div>
        </div>
  );
}
