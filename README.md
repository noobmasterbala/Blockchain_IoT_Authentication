# Nexus of 6G and Blockchain for Authentication (NBA) System


The Nexus of 6G and Blockchain for Authentication (NBA) system is a revolutionary approach to securing Internet of Things (IoT) environments, specifically focusing on enhancing the security and authentication of low-powered, "dumb" sensors deployed in hostile environments. This GitHub repository provides all the necessary information, code, and resources to understand, implement, and evaluate the NBA system.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How It Works](#how-it-works)

## Introduction

The Internet of Things (IoT) has transformed industries by enabling data collection and sharing through networks of sensors and devices. However, these IoT ecosystems are vulnerable to security threats, especially in harsh environments where low-powered sensors (referred to as "dumb" sensors) lack computational power to perform cryptographic operations. These sensors are favored for their low electrical signature but have limited computing capabilities.

To address the challenges posed by node capture and the lack of sensor location verification, the Nexus of 6G and Blockchain for Authentication (NBA) system was developed. This system leverages a permissioned blockchain-based network of Unmanned Aerial Vehicles (UAVs) and smart sensors to mitigate code tampering and ensure two-way trusted data transfer between UAVs and dumb sensors. Key components of the NBA system include the Hybrid Physical Unclonable Function Hashing (HPUFH) model for secure communication and the Pattern-based Signal Strength Correlation (PbSSC) algorithm for detecting unexpected location changes in the dumb sensor field.

## Features

- **Blockchain Security**: Utilizes a permissioned blockchain network to ensure data integrity and prevent unauthorized access. (Hyperledger Fabric)
- **HPUFH Model**: Implements the novel Hybrid Physical Unclonable Function Hashing (HPUFH) model for secure data transfer between UAVs and sensors.
- **PbSSC Algorithm**: Utilizes the novel Pattern-based Signal Strength Correlation (PbSSC) algorithm to detect and mitigate unexpected sensor location changes.
- **Efficiency**: Offers a highly efficient system with linear computational costs proportional to the number of challenge-response pairs.
- **Extensive Evaluation**: Backed by thorough security and performance evaluations to ensure reliability and robustness.

## How It Works

The NBA system combines the power of 6G networks, blockchain technology, and intelligent algorithms to create a secure and reliable environment for IoT data transfer. To understand the inner workings of the NBA system, refer to the [Visit IEEE](https://ieeexplore.ieee.org/abstract/document/9838856)

