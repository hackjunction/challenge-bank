import React, { useEffect, useState, useCallback } from 'react';
import styles from './EventAdmin.module.scss';

import { connect } from 'react-redux';
import { notification } from 'antd';
import { reduce } from 'lodash-es';

import CenteredContainer from 'components/CenteredContainer';
import AdminSubmissionsTable from 'components/AdminSubmissionsTable';
import AdminResultsTable from 'components/AdminResultsTable';
import Divider from 'components/Divider';

import ContentService from 'services/content';
import SubmissionsService from 'services/submissions';

import * as ContentSelectors from 'redux/content/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

const EventAdminPage = ({ token, difficultiesMap, categoriesMap }) => {
    const [loading, setLoading] = useState(false);
    const [challenges, setChallenges] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const loadChallenges = () => {
        return ContentService.getAllChallengesAdmin(token)
            .then(data => {
                const mapped = reduce(
                    data,
                    (map, challenge) => {
                        map[challenge.contentful_id] = {
                            ...challenge,
                            difficulty: difficultiesMap[challenge.difficulty],
                            category: categoriesMap[challenge.category]
                        };
                        return map;
                    },
                    {}
                );
                setChallenges(mapped);
            })
            .catch(err => {
                notification.error({
                    message: 'Error updating challenges',
                    description: 'Please refresh the page to try again'
                });
            })
            .finally(() => {
                return Promise.resolve();
            });
    };

    const loadSubmissions = () => {
        return SubmissionsService.getAllSubmissions(token)
            .then(data => {
                setSubmissions(data);
            })
            .catch(err => {
                notification.error({
                    message: 'Error updating submissions',
                    description: 'Please refresh the page and try again'
                });
            })
            .finally(() => {
                return Promise.resolve();
            });
    };
    const loadData = useCallback(async () => {
        setLoading(true);
        await loadChallenges();
        await loadSubmissions();
        setLoading(false);
    });

    const reloadSubmissions = useCallback(async () => {
        setLoading(true);
        await loadSubmissions();
        setLoading(false);
    });

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h3>Event admin</h3>
            </div>
            <CenteredContainer>
                <Divider size={1} />
                <h3>Submissions</h3>
                <AdminSubmissionsTable submissions={submissions} challenges={challenges} reload={reloadSubmissions} />
                <Divider size={1} />
                <h3>Results</h3>
                <AdminResultsTable submissions={submissions} challenges={challenges} />
            </CenteredContainer>
        </div>
    );
};

const mapState = state => ({
    token: AuthSelectors.token(state),
    categoriesMap: ContentSelectors.categoriesMap(state),
    difficultiesMap: ContentSelectors.difficultiesMap(state)
});

export default connect(mapState)(EventAdminPage);
