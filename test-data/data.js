const testresult = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 7180,
            "type": "job_event",
            "url": "/api/v2/job_events/7180/",
            "related": {
                "job": "/api/v2/jobs/533/",
                "children": "/api/v2/job_events/7180/children/",
                "host": "/api/v2/hosts/7/"
            },
            "summary_fields": {
                "host": {
                    "id": 7,
                    "name": "docker-host",
                    "description": "imported"
                },
                "job": {
                    "id": 533,
                    "name": "check network",
                    "description": "Selhal test DNS resolvingu",
                    "status": "failed",
                    "failed": true,
                    "elapsed": 15.12,
                    "type": "job",
                    "job_template_id": 14,
                    "job_template_name": "check network"
                },
                "role": {}
            },
            "created": "2023-07-27T10:32:45.582753Z",
            "modified": "2023-07-27T10:32:45.597369Z",
            "job": 533,
            "event": "runner_on_failed",
            "counter": 9,
            "event_display": "Host Failed",
            "event_data": {
                "playbook": "playbooks/check-network.yml",
                "playbook_uuid": "2f62fcb1-843a-418f-8987-21499e70b840",
                "play": "Check networking",
                "play_uuid": "6a95b199-dcb9-b161-dfe3-000000000002",
                "play_pattern": "docker-host",
                "task": "ansible.builtin.shell",
                "task_uuid": "6a95b199-dcb9-b161-dfe3-000000000004",
                "task_action": "ansible.builtin.shell",
                "resolved_action": "ansible.builtin.shell",
                "task_args": "",
                "task_path": "/runner/project/playbooks/check-network.yml:23",
                "host": "docker-host",
                "remote_addr": "docker-host",
                "res": {
                    "changed": true,
                    "stdout": "Host bleblenikdenic.com not found: 3(NXDOMAIN)",
                    "stderr": "",
                    "rc": 1,
                    "cmd": "host bleblenikdenic.com",
                    "start": "2023-07-27 10:32:45.471249",
                    "end": "2023-07-27 10:32:45.505202",
                    "delta": "0:00:00.033953",
                    "msg": "non-zero return code",
                    "invocation": {
                        "module_args": {
                            "_raw_params": "host bleblenikdenic.com",
                            "_uses_shell": true,
                            "stdin_add_newline": true,
                            "strip_empty_ends": true,
                            "argv": null,
                            "chdir": null,
                            "executable": null,
                            "creates": null,
                            "removes": null,
                            "stdin": null
                        }
                    },
                    "stdout_lines": [
                        "Host bleblenikdenic.com not found: 3(NXDOMAIN)"
                    ],
                    "stderr_lines": [],
                    "_ansible_no_log": null
                },
                "start": "2023-07-27T10:32:44.534128+00:00",
                "end": "2023-07-27T10:32:45.582385+00:00",
                "duration": 1.048257,
                "ignore_errors": true,
                "event_loop": null,
                "uuid": "52a0ecb5-d897-4af1-a313-dcda62243721",
                "guid": "650d7940015848dab99c4cc30f571e7f"
            },
            "event_level": 3,
            "failed": false,
            "changed": true,
            "uuid": "52a0ecb5-d897-4af1-a313-dcda62243721",
            "parent_uuid": "6a95b199-dcb9-b161-dfe3-000000000004",
            "host": 7,
            "host_name": "docker-host",
            "playbook": "playbooks/check-network.yml",
            "play": "Check networking",
            "task": "ansible.builtin.shell",
            "role": "",
            "stdout": "\u001b[0;31mfatal: [docker-host]: FAILED! => {\"changed\": true, \"cmd\": \"host bleblenikdenic.com\", \"delta\": \"0:00:00.033953\", \"end\": \"2023-07-27 10:32:45.505202\", \"msg\": \"non-zero return code\", \"rc\": 1, \"start\": \"2023-07-27 10:32:45.471249\", \"stderr\": \"\", \"stderr_lines\": [], \"stdout\": \"Host bleblenikdenic.com not found: 3(NXDOMAIN)\", \"stdout_lines\": [\"Host bleblenikdenic.com not found: 3(NXDOMAIN)\"]}\u001b[0m\r\n\u001b[0;36m...ignoring\u001b[0m",
            "start_line": 8,
            "end_line": 10,
            "verbosity": 0
        },
        {
            "id": 7182,
            "type": "job_event",
            "url": "/api/v2/job_events/7182/",
            "related": {
                "job": "/api/v2/jobs/533/",
                "children": "/api/v2/job_events/7182/children/",
                "host": "/api/v2/hosts/7/"
            },
            "summary_fields": {
                "host": {
                    "id": 7,
                    "name": "docker-host",
                    "description": "imported"
                },
                "job": {
                    "id": 533,
                    "name": "check network",
                    "description": "Selhal test DNS resolvingu",
                    "status": "failed",
                    "failed": true,
                    "elapsed": 15.12,
                    "type": "job",
                    "job_template_id": 14,
                    "job_template_name": "check network"
                },
                "role": {}
            },
            "created": "2023-07-27T10:32:45.693595Z",
            "modified": "2023-07-27T10:32:45.848094Z",
            "job": 533,
            "event": "runner_on_failed",
            "counter": 12,
            "event_display": "Host Failed",
            "event_data": {
                "playbook": "playbooks/check-network.yml",
                "playbook_uuid": "2f62fcb1-843a-418f-8987-21499e70b840",
                "play": "Check networking",
                "play_uuid": "6a95b199-dcb9-b161-dfe3-000000000002",
                "play_pattern": "docker-host",
                "task": "ansible.builtin.assert",
                "task_uuid": "6a95b199-dcb9-b161-dfe3-000000000005",
                "task_action": "ansible.builtin.assert",
                "resolved_action": "ansible.builtin.assert",
                "task_args": "",
                "task_path": "/runner/project/playbooks/check-network.yml:28",
                "host": "docker-host",
                "remote_addr": "docker-host",
                "res": {
                    "_ansible_verbose_always": true,
                    "evaluated_to": false,
                    "assertion": "'not found:' not in cmd_result.stdout",
                    "msg": "Host nenalezen v DNS. Zkontrolujte DNS resolving. Host bleblenikdenic.com not found: 3(NXDOMAIN)",
                    "_ansible_no_log": null,
                    "changed": false
                },
                "start": "2023-07-27T10:32:45.637486+00:00",
                "end": "2023-07-27T10:32:45.693170+00:00",
                "duration": 0.055684,
                "ignore_errors": null,
                "event_loop": null,
                "uuid": "7854c768-b9c4-4a1e-82d4-9ee9708955d3",
                "guid": "650d7940015848dab99c4cc30f571e7f"
            },
            "event_level": 3,
            "failed": true,
            "changed": false,
            "uuid": "7854c768-b9c4-4a1e-82d4-9ee9708955d3",
            "parent_uuid": "6a95b199-dcb9-b161-dfe3-000000000005",
            "host": 7,
            "host_name": "docker-host",
            "playbook": "playbooks/check-network.yml",
            "play": "Check networking",
            "task": "ansible.builtin.assert",
            "role": "",
            "stdout": "\u001b[0;31mfatal: [docker-host]: FAILED! => {\u001b[0m\r\n\u001b[0;31m    \"assertion\": \"'not found:' not in cmd_result.stdout\",\u001b[0m\r\n\u001b[0;31m    \"changed\": false,\u001b[0m\r\n\u001b[0;31m    \"evaluated_to\": false,\u001b[0m\r\n\u001b[0;31m    \"msg\": \"Host nenalezen v DNS. Zkontrolujte DNS resolving. Host bleblenikdenic.com not found: 3(NXDOMAIN)\"\u001b[0m\r\n\u001b[0;31m}\u001b[0m",
            "start_line": 12,
            "end_line": 18,
            "verbosity": 0
        }
    ]
}

export default testresult;
