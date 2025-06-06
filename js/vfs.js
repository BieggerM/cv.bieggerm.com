// js/vfs.js

export const fs = {
    type: 'dir', // The root itself is a directory
    children: {
        'home': {
            type: 'dir',
            children: {
                'guest': {
                    type: 'dir',
                    children: {
                        'welcome.txt': {
                            type: 'file',
                            content: `Welcome to my interactive terminal portfolio.
Type 'help' for a list of commands to get started.`
                        },
                        'documents': {
                            type: 'dir',
                            children: {
                                'cv.txt': {
                                    type: 'file',
                                    content: `Marius Biegger - Curriculum Vitae
=================================
To view a printer-friendly version, run: open cv

[About Me]
A highly motivated and results-oriented system engineer with over 5 years of experience...

[Career Journey]
- Dual Master Student at Audi AG (2024 - Present)
- System Engineer - DevOps at Vetter Pharma (2022 - 2024)
- ...and more.

[Skills]
Linux, Cloud (AWS, Azure), Automation (Ansible, Terraform), Containers (Docker, Kubernetes)...
`
                                },
                                'projects.txt': {
                                    type: 'file',
                                    content: `Key Projects
============
- Project Heimdall: A real-time monitoring dashboard using Prometheus & Grafana.
- Ansible Playbooks: A public repository of automation scripts for cloud provisioning.
- This Website: An interactive terminal portfolio built with vanilla JS.`
                                }
                            }
                        },
                        '.secret_lair': {
                            type: 'dir',
                            children: {
                                'treasure_map.txt': {
                                    type: 'file',
                                    content: `The real treasure was the commands we typed along the way.`
                                }
                            }
                        }
                    }
                }
            }
        },
        'bin': {
            type: 'dir',
            children: {}
        }
    }
};