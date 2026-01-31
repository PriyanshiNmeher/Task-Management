import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    if (!tasks.length) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>No tasks found. Create one to get started!</p>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#ffffff';
            case 'in-progress': return '#aaaaaa';
            default: return '#666666';
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {tasks.map((task) => (
                <div key={task._id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{task.title}</h3>
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            backgroundColor: `${getStatusColor(task.status)}20`,
                            color: getStatusColor(task.status),
                            fontWeight: '600',
                            textTransform: 'capitalize'
                        }}>
                            {task.status}
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                        {task.description || 'No description provided.'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
                        <button onClick={() => onEdit(task)} className="btn" style={{ background: '#334155', color: 'white', flex: 1 }}>
                            Edit
                        </button>
                        <button onClick={() => onDelete(task._id)} className="btn btn-danger" style={{ flex: 1 }}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
