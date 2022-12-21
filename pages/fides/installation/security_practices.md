# Deployment Security Best Practices

Fides offers several [configuration options](./configuration) to flexibly manage a variety of [deployments](./requirements). This guide is meant to be used as a supplement to the configuration options, and provides a summary for best practices to ensure appropriate security methods when working with Fides systems. 

## Configuration recommendations

### Fides Web Server
| Criteria | Recommendation | Example |
| - | --- | ------ |
| Encryption-in-transit | Enabled, secured with TLSv1.2 or TLSv1.3 | Deploy a load balancer for Fides listening on port 443.
| Redirect HTTP requests to HTTPS | Enabled | Deploy a load balancer for Fides listening on port 443. |
| App Encryption Key | Randomly generated string, at least 32 characters | Configured in a Fides [configuration file](./configuration).
| CORS Origins | Allowed CORS origins do not include a wildcard, `*` | Configured in a Fides [configuration file](./configuration). |
| OAuth Root Client Secret | Randomly generated string, at least 20 characters |  Configured in a Fides [configuration file](./configuration). |
| Log Level | INFO or higher (lower logging levels (e.g. DEBUG or TRACE) may reveal secrets in the console logs) |  Configured in a Fides [configuration file](./configuration). |
| User Management | Only grant needed scopes per the principle of least privilege, access revoked when no longer needed | Configured via API or UI. |
DSR Storage Destination | Uses a remote storage location (e.g. S3) | Configured via API or UI. | 

### Privacy Center
| Criteria | Recommendation | Example |
| - | --- | ------ |
| Encryption-in-transit | Enabled, secured with TLSv1.2 or TLSv1.3 | Deploy a load balancer for the Privacy Center listening on port 443. |
| Redirect HTTP requests to HTTPS | Enabled | Deploy a load balancer for the Privacy Center listening on port 443. |

### PostgreSQL Database
| Criteria | Recommendation | Example |
| - | --- | ------ |
| Encryption-in-transit | Enabled, secured with TLSv1.2 or TLSv1.3 | Use a managed database platform, such as AWS RDS, to manage PostgreSQL. Configured to prevent public access. |
| Encryption-at-rest | Enabled | Use a managed database platform, such as AWS RDS, to manage PostgreSQL. Configured to prevent public access. |
| Network Accessibility | Not accessible from the public Internet | Use a managed database platform, such as AWS RDS, to manage PostgreSQL. Configured to prevent public access. | 
| Role | Secured with the principle of least privilege (e.g. not a SUPERUSER) | Use a managed database platform, such as AWS RDS, to manage PostgreSQL. Configured to prevent public access. |

### Redis Database
| Criteria | Recommendation | Example |
| - | --- | ------ |
| Encryption-in-transit |Enabled, secured with TLSv1.2 or TLSv1.3 | Use a managed Redis platform, such as AWS Elasticache, to manage Redis. Configured to prevent public access. |
| Encryption-at-rest | Enabled | Use a managed Redis platform, such as AWS Elasticache, to manage Redis. Configured to prevent public access. |
| Network Accessibility | Not accessible from the public Internet | Use a managed Redis platform, such as AWS Elasticache, to manage Redis. Configured to prevent public access. |

### Remote Storage 
| Criteria | Recommendation | Example |
| - | --- | ------ |
| Encryption-at-rest | Server-Side Encryption enabled | Deploy an S3 bucket with encryption-at-rest enabled and a lifecycle rule. |
| Lifecycle Management | Automatically delete files older than 30 days | Deploy an S3 bucket with encryption-at-rest enabled and a lifecycle rule. |
| User Management | Access restricted to only the Fides service account | Deploy an S3 bucket with encryption-at-rest enabled and a lifecycle rule. |

 

