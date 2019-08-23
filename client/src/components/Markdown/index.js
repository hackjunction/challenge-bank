import React from 'react';
import styles from './Markdown.module.scss';

import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Link } from 'react-router-dom';
import Divider from 'components/Divider';

const Markdown = React.memo(({ className, source, light = false, large = false }) => {
    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [className]: true,
                [styles.light]: light,
                [styles.large]: large
            })}
        >
            <ReactMarkdown
                source={source}
                plugins={[breaks]}
                renderers={{
                    heading: ({ level, children }) => {
                        switch (level) {
                            case 1:
                                return <h1 className={styles.heading1}>{children}</h1>;
                            case 2:
                                return <h2 className={styles.heading2}>{children}</h2>;
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                return <h3 className={styles.heading3}>{children}</h3>;
                            default:
                                return null;
                        }
                    },
                    link: props => {
                        if (props.href.indexOf('http') === -1) {
                            return <Link to={props.href}>{props.children}</Link>;
                        } else {
                            return (
                                <a target="_blank" rel="noopener noreferrer" href={props.href}>
                                    {props.children}
                                </a>
                            );
                        }
                    },
                    linkReference: props => {
                        if (props.href.indexOf('http') === -1) {
                            return <Link to={props.href}>{props.children}</Link>;
                        } else {
                            return (
                                <a target="_blank" rel="noopener noreferrer" href={props.href}>
                                    {props.children}
                                </a>
                            );
                        }
                    }
                }}
            />
        </div>
    );
});

export default Markdown;
