// testing mock objects. 

// running
jobs_array1 = {
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2670,
            "type": "project_update",
            "url": "/api/v2/project_updates/2670/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "credential": "/api/v2/credentials/3/",
                "unified_job_template": "/api/v2/projects/8/",
                "stdout": "/api/v2/project_updates/2670/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/2/",
                "project": "/api/v2/projects/8/",
                "cancel": "/api/v2/project_updates/2670/cancel/",
                "scm_inventory_updates": "/api/v2/project_updates/2670/scm_inventory_updates/",
                "notifications": "/api/v2/project_updates/2670/notifications/",
                "events": "/api/v2/project_updates/2670/events/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "execution_environment": {
                    "id": 2,
                    "name": "Control Plane Execution Environment",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "project": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "status": "running",
                    "scm_type": "git",
                    "allow_override": true
                },
                "credential": {
                    "id": 3,
                    "name": "SA-gitlab",
                    "description": "",
                    "kind": "scm",
                    "cloud": false,
                    "kubernetes": false,
                    "credential_type_id": 2
                },
                "unified_job_template": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "unified_job_type": "project_update"
                },
                "instance_group": {
                    "id": 1,
                    "name": "controlplane",
                    "is_container_group": false
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                }
            },
            "created": "2023-06-04T06:36:46.949550Z",
            "modified": "2023-06-04T06:36:47.055342Z",
            "name": "SA-github",
            "description": "",
            "unified_job_template": 8,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 2,
            "failed": false,
            "started": "2023-06-04T06:36:47.101667Z",
            "finished": "2023-06-04T06:37:31.125927Z",
            "canceled_on": null,
            "elapsed": 44.024,
            "job_explanation": "",
            "execution_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "a6ItbYrN",
            "local_path": "_8__sa_github",
            "scm_type": "git",
            "scm_url": "git@github.com:krepsjan/awx-sa.git",
            "scm_branch": "",
            "scm_refspec": "",
            "scm_clean": true,
            "scm_track_submodules": false,
            "scm_delete_on_update": true,
            "credential": 3,
            "timeout": 0,
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821",
            "project": 8,
            "job_type": "check",
            "job_tags": "update_git,install_roles,install_collections,delete"
        },
        {
            "id": 2671,
            "type": "inventory_update",
            "url": "/api/v2/inventory_updates/2671/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "unified_job_template": "/api/v2/inventory_sources/18/",
                "stdout": "/api/v2/inventory_updates/2671/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/1/",
                "inventory_source": "/api/v2/inventory_sources/18/",
                "cancel": "/api/v2/inventory_updates/2671/cancel/",
                "notifications": "/api/v2/inventory_updates/2671/notifications/",
                "events": "/api/v2/inventory_updates/2671/events/",
                "source_project_update": "/api/v2/project_updates/2673/",
                "inventory": "/api/v2/inventories/4/",
                "credentials": "/api/v2/inventory_updates/2671/credentials/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 4,
                    "name": "Staging",
                    "description": "",
                    "has_active_failures": true,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 1,
                    "total_groups": 1,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 2,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "execution_environment": {
                    "id": 1,
                    "name": "AWX EE (latest)",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "unified_job_template": {
                    "id": 18,
                    "name": "Staging source",
                    "description": "",
                    "unified_job_type": "inventory_update"
                },
                "inventory_source": {
                    "id": 18,
                    "name": "Staging source",
                    "source": "scm",
                    "last_updated": "2023-06-04T06:39:54.730164Z",
                    "status": "successful"
                },
                "instance_group": {
                    "id": 2,
                    "name": "default",
                    "is_container_group": true
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "credentials": [],
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                }
            },
            "created": "2023-06-04T06:37:31.259957Z",
            "modified": "2023-06-04T06:38:09.577179Z",
            "name": "Staging - Staging source",
            "description": "",
            "unified_job_template": 18,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 1,
            "failed": false,
            "started": "2023-06-04T06:38:09.642533Z",
            "finished": "2023-06-04T06:39:54.730164Z",
            "canceled_on": null,
            "elapsed": 105.088,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "xNN2Cva5",
            "source": "scm",
            "source_path": "envs/staging/inventory",
            "source_vars": "---",
            "credential": null,
            "enabled_var": "",
            "enabled_value": "",
            "host_filter": "",
            "overwrite": true,
            "overwrite_vars": false,
            "custom_virtualenv": null,
            "timeout": 0,
            "verbosity": 1,
            "inventory": 4,
            "inventory_source": 18,
            "license_error": false,
            "org_host_limit_error": false,
            "source_project_update": 2673,
            "instance_group": 2,
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821"
        },
        {
            "id": 2674,
            "type": "job",
            "url": "/api/v2/jobs/2674/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "labels": "/api/v2/jobs/2674/labels/",
                "inventory": "/api/v2/inventories/4/",
                "project": "/api/v2/projects/8/",
                "organization": "/api/v2/organizations/1/",
                "credentials": "/api/v2/jobs/2674/credentials/",
                "unified_job_template": "/api/v2/job_templates/15/",
                "stdout": "/api/v2/jobs/2674/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "job_events": "/api/v2/jobs/2674/job_events/",
                "job_host_summaries": "/api/v2/jobs/2674/job_host_summaries/",
                "activity_stream": "/api/v2/jobs/2674/activity_stream/",
                "notifications": "/api/v2/jobs/2674/notifications/",
                "create_schedule": "/api/v2/jobs/2674/create_schedule/",
                "job_template": "/api/v2/job_templates/15/",
                "cancel": "/api/v2/jobs/2674/cancel/",
                "relaunch": "/api/v2/jobs/2674/relaunch/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 4,
                    "name": "Staging",
                    "description": "",
                    "has_active_failures": true,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 1,
                    "total_groups": 1,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 2,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "project": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "status": "running",
                    "scm_type": "git",
                    "allow_override": true
                },
                "job_template": {
                    "id": 15,
                    "name": "Provision Azure VM",
                    "description": ""
                },
                "unified_job_template": {
                    "id": 15,
                    "name": "Provision Azure VM",
                    "description": "",
                    "unified_job_type": "job"
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "labels": {
                    "count": 0,
                    "results": []
                },
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                },
                "credentials": [
                    {
                        "id": 5,
                        "name": "Azure rm",
                        "description": "",
                        "kind": "azure_rm",
                        "cloud": true
                    }
                ]
            },
            "created": "2023-06-04T06:39:55.002299Z",
            "modified": "2023-06-04T06:39:55.002314Z",
            "name": "Provision Azure VM",
            "description": "",
            "unified_job_template": 15,
            "launch_type": "workflow",
            "status": "pending",
            "execution_environment": null,
            "failed": false,
            "started": null,
            "finished": null,
            "canceled_on": null,
            "elapsed": 0,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": null,
            "job_type": "run",
            "inventory": 4,
            "project": 8,
            "playbook": "playbooks/provision-azure-vm.yml",
            "scm_branch": "",
            "forks": 0,
            "limit": "",
            "verbosity": 0,
            "extra_vars": "{}",
            "job_tags": "",
            "force_handlers": false,
            "skip_tags": "",
            "start_at_task": "",
            "timeout": 0,
            "use_fact_cache": false,
            "organization": 1,
            "job_template": 15,
            "passwords_needed_to_start": [],
            "allow_simultaneous": false,
            "artifacts": {},
            "scm_revision": "",
            "instance_group": null,
            "diff_mode": false,
            "job_slice_number": 0,
            "job_slice_count": 1,
            "webhook_service": "",
            "webhook_credential": null,
            "webhook_guid": ""
        }
    ]
}

// failed, completed
jobs_array2 = {
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2670,
            "type": "project_update",
            "url": "/api/v2/project_updates/2670/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "credential": "/api/v2/credentials/3/",
                "unified_job_template": "/api/v2/projects/8/",
                "stdout": "/api/v2/project_updates/2670/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/2/",
                "project": "/api/v2/projects/8/",
                "cancel": "/api/v2/project_updates/2670/cancel/",
                "scm_inventory_updates": "/api/v2/project_updates/2670/scm_inventory_updates/",
                "notifications": "/api/v2/project_updates/2670/notifications/",
                "events": "/api/v2/project_updates/2670/events/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "execution_environment": {
                    "id": 2,
                    "name": "Control Plane Execution Environment",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "project": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "status": "successful",
                    "scm_type": "git",
                    "allow_override": true
                },
                "credential": {
                    "id": 3,
                    "name": "SA-gitlab",
                    "description": "",
                    "kind": "scm",
                    "cloud": false,
                    "kubernetes": false,
                    "credential_type_id": 2
                },
                "unified_job_template": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "unified_job_type": "project_update"
                },
                "instance_group": {
                    "id": 1,
                    "name": "controlplane",
                    "is_container_group": false
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                }
            },
            "created": "2023-06-04T06:36:46.949550Z",
            "modified": "2023-06-04T06:36:47.055342Z",
            "name": "SA-github",
            "description": "",
            "unified_job_template": 8,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 2,
            "failed": false,
            "started": "2023-06-04T06:36:47.101667Z",
            "finished": "2023-06-04T06:37:31.125927Z",
            "canceled_on": null,
            "elapsed": 44.024,
            "job_explanation": "",
            "execution_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "a6ItbYrN",
            "local_path": "_8__sa_github",
            "scm_type": "git",
            "scm_url": "git@github.com:krepsjan/awx-sa.git",
            "scm_branch": "",
            "scm_refspec": "",
            "scm_clean": true,
            "scm_track_submodules": false,
            "scm_delete_on_update": true,
            "credential": 3,
            "timeout": 0,
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821",
            "project": 8,
            "job_type": "check",
            "job_tags": "update_git,install_roles,install_collections,delete"
        },
        {
            "id": 2671,
            "type": "inventory_update",
            "url": "/api/v2/inventory_updates/2671/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "unified_job_template": "/api/v2/inventory_sources/18/",
                "stdout": "/api/v2/inventory_updates/2671/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/1/",
                "inventory_source": "/api/v2/inventory_sources/18/",
                "cancel": "/api/v2/inventory_updates/2671/cancel/",
                "notifications": "/api/v2/inventory_updates/2671/notifications/",
                "events": "/api/v2/inventory_updates/2671/events/",
                "source_project_update": "/api/v2/project_updates/2673/",
                "inventory": "/api/v2/inventories/4/",
                "credentials": "/api/v2/inventory_updates/2671/credentials/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 4,
                    "name": "Staging",
                    "description": "",
                    "has_active_failures": true,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 1,
                    "total_groups": 1,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 2,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "execution_environment": {
                    "id": 1,
                    "name": "AWX EE (latest)",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "unified_job_template": {
                    "id": 18,
                    "name": "Staging source",
                    "description": "",
                    "unified_job_type": "inventory_update"
                },
                "inventory_source": {
                    "id": 18,
                    "name": "Staging source",
                    "source": "scm",
                    "last_updated": "2023-06-04T06:39:54.730164Z",
                    "status": "successful"
                },
                "instance_group": {
                    "id": 2,
                    "name": "default",
                    "is_container_group": true
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "credentials": [],
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                }
            },
            "created": "2023-06-04T06:37:31.259957Z",
            "modified": "2023-06-04T06:38:09.577179Z",
            "name": "Staging - Staging source",
            "description": "",
            "unified_job_template": 18,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 1,
            "failed": false,
            "started": "2023-06-04T06:38:09.642533Z",
            "finished": "2023-06-04T06:39:54.730164Z",
            "canceled_on": null,
            "elapsed": 105.088,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "xNN2Cva5",
            "source": "scm",
            "source_path": "envs/staging/inventory",
            "source_vars": "---",
            "credential": null,
            "enabled_var": "",
            "enabled_value": "",
            "host_filter": "",
            "overwrite": true,
            "overwrite_vars": false,
            "custom_virtualenv": null,
            "timeout": 0,
            "verbosity": 1,
            "inventory": 4,
            "inventory_source": 18,
            "license_error": false,
            "org_host_limit_error": false,
            "source_project_update": 2673,
            "instance_group": 2,
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821"
        },
        {
            "id": 2674,
            "type": "job",
            "url": "/api/v2/jobs/2674/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "labels": "/api/v2/jobs/2674/labels/",
                "inventory": "/api/v2/inventories/4/",
                "project": "/api/v2/projects/8/",
                "organization": "/api/v2/organizations/1/",
                "credentials": "/api/v2/jobs/2674/credentials/",
                "unified_job_template": "/api/v2/job_templates/15/",
                "stdout": "/api/v2/jobs/2674/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/1/",
                "job_events": "/api/v2/jobs/2674/job_events/",
                "job_host_summaries": "/api/v2/jobs/2674/job_host_summaries/",
                "activity_stream": "/api/v2/jobs/2674/activity_stream/",
                "notifications": "/api/v2/jobs/2674/notifications/",
                "create_schedule": "/api/v2/jobs/2674/create_schedule/",
                "job_template": "/api/v2/job_templates/15/",
                "cancel": "/api/v2/jobs/2674/cancel/",
                "relaunch": "/api/v2/jobs/2674/relaunch/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 4,
                    "name": "Staging",
                    "description": "",
                    "has_active_failures": true,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 1,
                    "total_groups": 1,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 2,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "execution_environment": {
                    "id": 1,
                    "name": "AWX EE (latest)",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "project": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "status": "successful",
                    "scm_type": "git",
                    "allow_override": true
                },
                "job_template": {
                    "id": 15,
                    "name": "Provision Azure VM",
                    "description": ""
                },
                "unified_job_template": {
                    "id": 15,
                    "name": "Provision Azure VM",
                    "description": "",
                    "unified_job_type": "job"
                },
                "instance_group": {
                    "id": 2,
                    "name": "default",
                    "is_container_group": true
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "labels": {
                    "count": 0,
                    "results": []
                },
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                },
                "credentials": [
                    {
                        "id": 5,
                        "name": "Azure rm",
                        "description": "",
                        "kind": "azure_rm",
                        "cloud": true
                    }
                ]
            },
            "created": "2023-06-04T06:39:55.002299Z",
            "modified": "2023-06-04T06:40:33.578691Z",
            "name": "Provision Azure VM",
            "description": "",
            "unified_job_template": 15,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 1,
            "failed": false,
            "started": "2023-06-04T06:40:33.641645Z",
            "finished": "2023-06-04T06:40:56.655017Z",
            "canceled_on": null,
            "elapsed": 23.013,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "ExcZnjNb",
            "job_type": "run",
            "inventory": 4,
            "project": 8,
            "playbook": "playbooks/provision-azure-vm.yml",
            "scm_branch": "",
            "forks": 0,
            "limit": "",
            "verbosity": 0,
            "extra_vars": "{}",
            "job_tags": "",
            "force_handlers": false,
            "skip_tags": "",
            "start_at_task": "",
            "timeout": 0,
            "use_fact_cache": false,
            "organization": 1,
            "job_template": 15,
            "passwords_needed_to_start": [],
            "allow_simultaneous": false,
            "artifacts": {},
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821",
            "instance_group": 2,
            "diff_mode": false,
            "job_slice_number": 0,
            "job_slice_count": 1,
            "webhook_service": "",
            "webhook_credential": null,
            "webhook_guid": ""
        },
        {
            "id": 2676,
            "type": "inventory_update",
            "url": "/api/v2/inventory_updates/2676/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "credential": "/api/v2/credentials/5/",
                "unified_job_template": "/api/v2/inventory_sources/20/",
                "stdout": "/api/v2/inventory_updates/2676/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/1/",
                "inventory_source": "/api/v2/inventory_sources/20/",
                "cancel": "/api/v2/inventory_updates/2676/cancel/",
                "notifications": "/api/v2/inventory_updates/2676/notifications/",
                "events": "/api/v2/inventory_updates/2676/events/",
                "inventory": "/api/v2/inventories/5/",
                "credentials": "/api/v2/inventory_updates/2676/credentials/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 5,
                    "name": "Azure_rm",
                    "description": "",
                    "has_active_failures": false,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 0,
                    "total_groups": 0,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 1,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "execution_environment": {
                    "id": 1,
                    "name": "AWX EE (latest)",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "credential": {
                    "id": 5,
                    "name": "Azure rm",
                    "description": "",
                    "kind": "azure_rm",
                    "cloud": true,
                    "credential_type_id": 10
                },
                "unified_job_template": {
                    "id": 20,
                    "name": "Azurerm",
                    "description": "",
                    "unified_job_type": "inventory_update"
                },
                "inventory_source": {
                    "id": 20,
                    "name": "Azurerm",
                    "source": "azure_rm",
                    "last_updated": "2023-06-04T06:41:02.101289Z",
                    "status": "successful"
                },
                "instance_group": {
                    "id": 2,
                    "name": "default",
                    "is_container_group": true
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "credentials": [
                    {
                        "id": 5,
                        "name": "Azure rm",
                        "description": "",
                        "kind": "azure_rm",
                        "cloud": true,
                        "credential_type_id": 10
                    }
                ],
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                }
            },
            "created": "2023-06-04T06:40:56.955796Z",
            "modified": "2023-06-04T06:40:57.320986Z",
            "name": "Azure_rm - Azurerm",
            "description": "",
            "unified_job_template": 20,
            "launch_type": "workflow",
            "status": "successful",
            "execution_environment": 1,
            "failed": false,
            "started": "2023-06-04T06:40:57.398095Z",
            "finished": "2023-06-04T06:41:02.101289Z",
            "canceled_on": null,
            "elapsed": 4.703,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "h0EGlTqO",
            "source": "azure_rm",
            "source_path": "",
            "source_vars": "---\ngroup_by_tag: true",
            "credential": 5,
            "enabled_var": "",
            "enabled_value": "",
            "host_filter": "",
            "overwrite": true,
            "overwrite_vars": true,
            "custom_virtualenv": null,
            "timeout": 0,
            "verbosity": 2,
            "inventory": 5,
            "inventory_source": 20,
            "license_error": false,
            "org_host_limit_error": false,
            "source_project_update": null,
            "instance_group": 2,
            "scm_revision": ""
        },
        {
            "id": 2677,
            "type": "job",
            "url": "/api/v2/jobs/2677/",
            "related": {
                "created_by": "/api/v2/users/1/",
                "labels": "/api/v2/jobs/2677/labels/",
                "inventory": "/api/v2/inventories/4/",
                "project": "/api/v2/projects/8/",
                "organization": "/api/v2/organizations/1/",
                "credentials": "/api/v2/jobs/2677/credentials/",
                "unified_job_template": "/api/v2/job_templates/17/",
                "stdout": "/api/v2/jobs/2677/stdout/",
                "source_workflow_job": "/api/v2/workflow_jobs/2669/",
                "execution_environment": "/api/v2/execution_environments/1/",
                "job_events": "/api/v2/jobs/2677/job_events/",
                "job_host_summaries": "/api/v2/jobs/2677/job_host_summaries/",
                "activity_stream": "/api/v2/jobs/2677/activity_stream/",
                "notifications": "/api/v2/jobs/2677/notifications/",
                "create_schedule": "/api/v2/jobs/2677/create_schedule/",
                "job_template": "/api/v2/job_templates/17/",
                "cancel": "/api/v2/jobs/2677/cancel/",
                "relaunch": "/api/v2/jobs/2677/relaunch/"
            },
            "summary_fields": {
                "organization": {
                    "id": 1,
                    "name": "Default",
                    "description": ""
                },
                "inventory": {
                    "id": 4,
                    "name": "Staging",
                    "description": "",
                    "has_active_failures": true,
                    "total_hosts": 1,
                    "hosts_with_active_failures": 1,
                    "total_groups": 1,
                    "has_inventory_sources": true,
                    "total_inventory_sources": 2,
                    "inventory_sources_with_failures": 0,
                    "organization_id": 1,
                    "kind": ""
                },
                "execution_environment": {
                    "id": 1,
                    "name": "AWX EE (latest)",
                    "description": "",
                    "image": "quay.io/ansible/awx-ee:latest"
                },
                "project": {
                    "id": 8,
                    "name": "SA-github",
                    "description": "",
                    "status": "successful",
                    "scm_type": "git",
                    "allow_override": true
                },
                "job_template": {
                    "id": 17,
                    "name": "Install docker",
                    "description": "Obratte se na oddeleni systemove podpory Azure"
                },
                "unified_job_template": {
                    "id": 17,
                    "name": "Install docker",
                    "description": "Obratte se na oddeleni systemove podpory Azure",
                    "unified_job_type": "job"
                },
                "instance_group": {
                    "id": 2,
                    "name": "default",
                    "is_container_group": true
                },
                "created_by": {
                    "id": 1,
                    "username": "admin",
                    "first_name": "",
                    "last_name": ""
                },
                "user_capabilities": {
                    "delete": true,
                    "start": true
                },
                "labels": {
                    "count": 0,
                    "results": []
                },
                "source_workflow_job": {
                    "id": 2669,
                    "name": "Fixme workflow",
                    "description": "",
                    "status": "running",
                    "failed": false,
                    "elapsed": 0
                },
                "credentials": [
                    {
                        "id": 4,
                        "name": "docker-host",
                        "description": "",
                        "kind": "ssh",
                        "cloud": false
                    }
                ]
            },
            "created": "2023-06-04T06:41:02.270112Z",
            "modified": "2023-06-04T06:41:43.364749Z",
            "name": "Install docker",
            "description": "Obratte se na oddeleni systemove podpory Azure",
            "unified_job_template": 17,
            "launch_type": "workflow",
            "status": "failed",
            "execution_environment": 1,
            "failed": true,
            "started": "2023-06-04T06:41:43.486085Z",
            "finished": "2023-06-04T06:42:24.655025Z",
            "canceled_on": null,
            "elapsed": 41.169,
            "job_explanation": "",
            "execution_node": "",
            "controller_node": "awx-65db48d759-pbk7d",
            "launched_by": {
                "id": 1,
                "name": "admin",
                "type": "user",
                "url": "/api/v2/users/1/"
            },
            "work_unit_id": "Sa6fSnbr",
            "job_type": "run",
            "inventory": 4,
            "project": 8,
            "playbook": "playbooks/install-docker.yml",
            "scm_branch": "",
            "forks": 0,
            "limit": "",
            "verbosity": 2,
            "extra_vars": "{}",
            "job_tags": "",
            "force_handlers": false,
            "skip_tags": "",
            "start_at_task": "",
            "timeout": 0,
            "use_fact_cache": false,
            "organization": 1,
            "job_template": 17,
            "passwords_needed_to_start": [],
            "allow_simultaneous": false,
            "artifacts": {},
            "scm_revision": "2fecdad0f8913a92e94daa3bafa15c5cdbedd821",
            "instance_group": 2,
            "diff_mode": false,
            "job_slice_number": 0,
            "job_slice_count": 1,
            "webhook_service": "",
            "webhook_credential": null,
            "webhook_guid": ""
        }
    ]
}


// resulting element
/*
<div id="results">
<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>    Workflow job Fixme workflow status: failed</div><div id="2670" class="alert alert-success" role="alert"> <i class="fa fa-check" aria-hidden="true"></i> Job <b>SA-github</b> is successful</div><div id="2671" class="alert alert-success" role="alert"> <i class="fa fa-check" aria-hidden="true"></i> Job <b>Staging - Staging source</b> is successful</div><div id="2674" class="alert alert-success" role="alert"> <i class="fa fa-check" aria-hidden="true"></i> Job <b>Provision Azure VM</b> is successful</div><div id="2676" class="alert alert-success" role="alert"> <i class="fa fa-check" aria-hidden="true"></i> Job <b>Azure_rm - Azurerm</b> is successful</div><div id="2677" class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>  Task <b>Install docker</b> failed<br>Obratte se na oddeleni systemove podpory Azure<br>host: self-hosted-gateway-vm_b51f<br>error: No package matching 'cosi' is available</div><div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>    Workflow job Fixme workflow status: failed</div></div>

*/